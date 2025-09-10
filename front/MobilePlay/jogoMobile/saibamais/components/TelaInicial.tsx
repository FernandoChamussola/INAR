import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Dimensions, 
  StatusBar,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import JogoPalavras from '@/components/JogoPalavras';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const NIVEIS = [
  { nome: 'Bronze', min: 0, max: 9, cor: '#CD7F32', gradiente: ['#CD7F32', '#A0522D'] },
  { nome: 'Prata', min: 10, max: 90, cor: '#C0C0C0', gradiente: ['#E5E5E5', '#C0C0C0'] },
  { nome: 'Ouro', min: 91, max: 200, cor: '#FFD700', gradiente: ['#FFD700', '#FFA500'] },
  { nome: 'Diamante', min: 201, max: 999, cor: '#B9F2FF', gradiente: ['#B9F2FF', '#00CED1'] },
];

const getNivel = (total: number) => {
  return NIVEIS.find(n => total >= n.min && total <= n.max) || NIVEIS[0];
};

const medalhas = [
  { nome: 'Bronze', min: 0, emoji: '🥉' },
  { nome: 'Prata', min: 10, emoji: '🥈' },
  { nome: 'Ouro', min: 91, emoji: '🥇' },
  { nome: 'Diamante', min: 201, emoji: '💎' },
];

const TelaInicial = () => {
  const [iniciar, setIniciar] = useState(false);
  const [modoDesafio, setModoDesafio] = useState(false);
  const [palavrasAprendidas, setPalavrasAprendidas] = useState(0);
  const [nivelAtual, setNivelAtual] = useState(NIVEIS[0]);
  const [medalha, setMedalha] = useState('🥉');
  const [animatedValue] = useState(new Animated.Value(0));
  const [pulseAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    const carregarProgresso = async () => {
      try {
        const respondidas = await AsyncStorage.getItem('palavras_respondidas');
        const arr = respondidas ? JSON.parse(respondidas) : [];
        setPalavrasAprendidas(arr.length);
        const nivel = getNivel(arr.length);
        setNivelAtual(nivel);
        setMedalha(medalhas.find(m => nivel.nome === m.nome)?.emoji || '🥉');
      } catch (e) {
        setPalavrasAprendidas(0);
        setNivelAtual(NIVEIS[0]);
        setMedalha('🥉');
      }
    };
    carregarProgresso();

    // Animação de entrada
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Animação pulsante contínua para a medalha
    const pulseLoop = () => {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulseLoop());
    };
    pulseLoop();
  }, [iniciar]);

  const calcularProgresso = () => {
    const proximoNivel = NIVEIS.find(n => n.min > palavrasAprendidas) || NIVEIS[NIVEIS.length - 1];
    const progressoAtual = palavrasAprendidas - nivelAtual.min;
    const totalNecessario = proximoNivel.min - nivelAtual.min;
    return totalNecessario > 0 ? progressoAtual / totalNecessario : 1;
  };

  if (iniciar) {
    return <JogoPalavras sprintSize={10} modoDesafio={modoDesafio} onFinishSprint={() => setIniciar(false)} />;
  }

  const progresso = calcularProgresso();
  const proximoNivel = NIVEIS.find(n => n.min > palavrasAprendidas);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            style={[
              styles.header,
              {
                opacity: animatedValue,
                transform: [
                  {
                    translateY: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.titulo}>🎮 Jogo das Palavras</Text>
            <Text style={styles.subtitulo}>Desafie seu vocabulário!</Text>
          </Animated.View>

          <Animated.View 
            style={[
              styles.nivelCard,
              {
                opacity: animatedValue,
                transform: [{ scale: animatedValue }],
              },
            ]}
          >
            <LinearGradient
              colors={nivelAtual.gradiente}
              style={styles.nivelGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.nivelContent}>
                <Animated.Text 
                  style={[
                    styles.medalhaEmoji,
                    { transform: [{ scale: pulseAnimation }] }
                  ]}
                >
                  {medalha}
                </Animated.Text>
                <Text style={styles.nivelNome}>{nivelAtual.nome}</Text>
                <Text style={styles.palavrasCount}>{palavrasAprendidas} palavras</Text>
              </View>
            </LinearGradient>

            {proximoNivel && (
              <View style={styles.progressoContainer}>
                <View style={styles.progressoInfo}>
                  <Text style={styles.progressoTexto}>
                    Próximo nível: {proximoNivel.nome}
                  </Text>
                  <Text style={styles.progressoNumero}>
                    {palavrasAprendidas}/{proximoNivel.min}
                  </Text>
                </View>
                <View style={styles.progressoBarra}>
                  <View 
                    style={[
                      styles.progressoPreenchimento, 
                      { width: `${Math.min(progresso * 100, 100)}%` }
                    ]} 
                  />
                </View>
              </View>
            )}
          </Animated.View>

          <Animated.View 
            style={[
              styles.descricaoCard,
              {
                opacity: animatedValue,
                transform: [
                  {
                    translateY: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Ionicons name="information-circle" size={24} color="#4a90e2" />
            <Text style={styles.descricao}>
              Teste seus conhecimentos! Descubra a palavra correta a partir da dica apresentada. 
              Cada sprint tem 10 palavras para você dominar.
            </Text>
          </Animated.View>

          <Animated.View 
            style={[
              styles.botoesContainer,
              {
                opacity: animatedValue,
                transform: [
                  {
                    translateY: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [100, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity 
              style={[styles.botao, styles.botaoNormal]}
              onPress={() => {setModoDesafio(false); setIniciar(true);}}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4a90e2', '#357abd']}
                style={styles.botaoGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="play-circle" size={24} color="#fff" />
                <Text style={styles.textoBotao}>Jogo Normal</Text>
                <Text style={styles.textoBotaoSubtitulo}>Sem pressão de tempo</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.botao, styles.botaoDesafio]}
              onPress={() => {setModoDesafio(true); setIniciar(true);}}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#e24a4a', '#c93636']}
                style={styles.botaoGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="flash" size={24} color="#fff" />
                <Text style={styles.textoBotao}>Modo Desafio</Text>
                <Text style={styles.textoBotaoSubtitulo}>Contra o tempo! ⏱️</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Desenvolvido com ❤️ para aprendizado
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    minHeight: height,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitulo: {
    fontSize: 18,
    color: '#b8c7d9',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  nivelCard: {
    marginBottom: 24,
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  nivelGradient: {
    borderRadius: 20,
    padding: 24,
  },
  nivelContent: {
    alignItems: 'center',
  },
  medalhaEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  nivelNome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginBottom: 8,
  },
  palavrasCount: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    opacity: 0.9,
  },
  progressoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  progressoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressoTexto: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  progressoNumero: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    opacity: 0.8,
  },
  progressoBarra: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressoPreenchimento: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  descricaoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  descricao: {
    fontSize: 16,
    color: '#e1e8f0',
    textAlign: 'left',
    lineHeight: 24,
    marginLeft: 12,
    flex: 1,
  },
  botoesContainer: {
    gap: 16,
  },
  botao: {
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  botaoGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 16,
    gap: 12,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  textoBotaoSubtitulo: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    position: 'absolute',
    bottom: 6,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#7a8ca0',
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default TelaInicial;
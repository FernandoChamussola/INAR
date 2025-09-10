import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Animated, 
  Dimensions,

  StatusBar,
  ScrollView,
  Vibration
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import frasesData from '../assets/frases.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

function shuffle(array: string[]): string[] {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const STORAGE_KEY = 'palavras_respondidas';

type JogoPalavrasProps = {
  sprintSize?: number;
  modoDesafio?: boolean;
  onFinishSprint?: () => void;
};

const JogoPalavras: React.FC<JogoPalavrasProps> = ({ 
  sprintSize = 10, 
  modoDesafio = false, 
  onFinishSprint 
}) => {
  const [frases, setFrases] = useState(frasesData.frases);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [letras, setLetras] = useState<string[]>([]);
  const [dicasRestantes, setDicasRestantes] = useState(2);
  const [pulosRestantes, setPulosRestantes] = useState(1);
  const [tempoRestante, setTempoRestante] = useState(60);
  const [timerAtivo, setTimerAtivo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [palavrasCompletas, setPalavrasCompletas] = useState(0);
  const [streak, setStreak] = useState(0);
  
  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const carregarProgresso = async () => {
      try {
        const respondidas = await AsyncStorage.getItem(STORAGE_KEY);
        let respondidasArr: string[] = respondidas ? JSON.parse(respondidas) : [];
        const frasesFiltradas = frasesData.frases.filter(f => !respondidasArr.includes(f.palavra));
        setFrases(frasesFiltradas.slice(0, sprintSize));
      } catch (e) {
        setFrases(frasesData.frases.slice(0, sprintSize));
      } finally {
        setLoading(false);
        setDicasRestantes(2);
        setPulosRestantes(1);
        setTempoRestante(60);
        setTimerAtivo(modoDesafio);
        
        // Animação de entrada
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start();
      }
    };
    carregarProgresso();
  }, [sprintSize, modoDesafio]);

  useEffect(() => {
    if (frases.length > 0) {
      const extraLetters = Math.min(6 + current, 12);
      const palavra = frases[current].palavra;
      const embaralhadas = shuffle([...palavra.split(''), ...shuffle('abcdefghijklmnopqrstuvwxyz'.split('')).slice(0, extraLetters)]);
      setLetras(embaralhadas);
      setInput('');
      
      // Atualiza animação de progresso
      const progresso = palavrasCompletas / sprintSize;
      Animated.timing(progressAnim, {
        toValue: progresso,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [current, frases, palavrasCompletas, sprintSize]);

  // Timer para modo desafio
  useEffect(() => {
    if (timerAtivo && tempoRestante > 0) {
      const timer = setTimeout(() => setTempoRestante(tempoRestante - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timerAtivo && tempoRestante === 0) {
      Alert.alert('⏰ Tempo esgotado!', 'O tempo acabou! Tente novamente.', [
        { 
          text: 'OK', 
          onPress: () => { 
            if (onFinishSprint) onFinishSprint(); 
          } 
        }
      ]);
      setTimerAtivo(false);
    }
  }, [timerAtivo, tempoRestante, onFinishSprint]);

  const animarShake = () => {
    Vibration.vibrate(100);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleLetra = (letra: string, index: number) => {
    if (input.length < frases[current].palavra.length) {
      setInput(input + letra);
      
      // Remove a letra clicada temporariamente
      const novasLetras = [...letras];
      novasLetras.splice(index, 1);
      setLetras(novasLetras);
      
      // Feedback tátil
      Vibration.vibrate(50);
    }
  };

  const handleApagar = () => {
    if (input.length > 0) {
      const ultimaLetra = input[input.length - 1];
      setInput(input.slice(0, -1));
      
      // Adiciona a letra de volta
      setLetras([...letras, ultimaLetra]);
      
      Vibration.vibrate(30);
    }
  };

  const handleVerificar = async () => {
    if (timerAtivo && tempoRestante === 0) return;
    
    if (input.toLowerCase() === frases[current].palavra.toLowerCase()) {
      // Sucesso!
      try {
        const respondidas = await AsyncStorage.getItem(STORAGE_KEY);
        let respondidasArr: string[] = respondidas ? JSON.parse(respondidas) : [];
        respondidasArr.push(frases[current].palavra);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(respondidasArr));
      } catch (e) {}
      
      setPalavrasCompletas(prev => prev + 1);
      setStreak(prev => prev + 1);
      
      const novasFrases = frases.filter((_, idx) => idx !== current);
      if (novasFrases.length === 0) {
        setTimerAtivo(false);
        Alert.alert('🎉 Sprint Concluído!', `Parabéns! Você completou ${sprintSize} palavras com sucesso!`, [
          {
            text: '✨ Continuar',
            onPress: () => {
              if (onFinishSprint) onFinishSprint();
            },
          },
        ]);
        setFrases([]);
      } else {
        setFrases(novasFrases);
        setCurrent(0);
        
        // Feedback positivo
        Vibration.vibrate([50, 50, 50]);
      }
    } else {
      // Erro
      animarShake();
      setStreak(0);
      Alert.alert('❌ Palavra Incorreta', 'Tente novamente! Você consegue!', [
        { text: 'OK' }
      ]);
    }
  };

  const revelarLetra = () => {
    if (dicasRestantes > 0) {
      const palavra = frases[current].palavra;
      let idx = input.length;
      if (idx < palavra.length) {
        const letraCorreta = palavra[idx];
        setInput(input + letraCorreta);
        setDicasRestantes(dicasRestantes - 1);
        
        // Remove a letra correta das opções
        const novasLetras = letras.filter((letra, i) => 
          i !== letras.findIndex(l => l === letraCorreta)
        );
        setLetras(novasLetras);
        
        Vibration.vibrate(100);
      }
    }
  };

  const pularPalavra = () => {
    if (pulosRestantes > 0) {
      if (current < frases.length - 1) {
        setCurrent(current + 1);
        setInput('');
        setPulosRestantes(pulosRestantes - 1);
        setStreak(0);
        Vibration.vibrate(50);
      }
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Ionicons name="refresh" size={48} color="#fff" />
          </Animated.View>
          <Text style={styles.loadingText}>Preparando o desafio...</Text>
        </View>
      </LinearGradient>
    );
  }

  if (frases.length === 0) {
    return (
      <LinearGradient colors={['#11998e', '#38ef7d']} style={styles.container}>
        <View style={styles.sucessoContainer}>
          <Ionicons name="trophy" size={80} color="#fff" />
          <Text style={styles.sucessoTitulo}>🎉 Sprint Concluído!</Text>
          <Text style={styles.sucessoSubtitulo}>
            Você completou {sprintSize} palavras!
          </Text>
        </View>
      </LinearGradient>
    );
  }

  const palavra = frases[current].palavra;
  const progresso = palavrasCompletas / sprintSize;
  const tempoPercentual = tempoRestante / 60;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient 
        colors={modoDesafio ? ['#ff6b6b', '#ee5a24'] : ['#667eea', '#764ba2']} 
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.View 
            style={[
              styles.headerContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Progresso do Sprint */}
            <View style={styles.progressoSprint}>
              <View style={styles.progressoInfo}>
                <Text style={styles.progressoTexto}>
                  Progresso: {palavrasCompletas}/{sprintSize}
                </Text>
                {streak > 0 && (
                  <View style={styles.streakContainer}>
                    <Ionicons name="flame" size={16} color="#ff6b35" />
                    <Text style={styles.streakText}>{streak}</Text>
                  </View>
                )}
              </View>
              <View style={styles.progressoBarra}>
                <Animated.View 
                  style={[
                    styles.progressoPreenchimento,
                    {
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%']
                      })
                    }
                  ]} 
                />
              </View>
            </View>

            {/* Timer para modo desafio */}
            {modoDesafio && (
              <View style={styles.timerContainer}>
                <Ionicons 
                  name="timer" 
                  size={24} 
                  color={tempoRestante <= 10 ? '#ff3838' : '#fff'} 
                />
                <Text 
                  style={[
                    styles.timerTexto,
                    { color: tempoRestante <= 10 ? '#ff3838' : '#fff' }
                  ]}
                >
                  {Math.floor(tempoRestante / 60)}:{(tempoRestante % 60).toString().padStart(2, '0')}
                </Text>
                <View style={styles.timerBarra}>
                  <View 
                    style={[
                      styles.timerPreenchimento,
                      { 
                        width: `${tempoPercentual * 100}%`,
                        backgroundColor: tempoRestante <= 10 ? '#ff3838' : '#4ecdc4'
                      }
                    ]} 
                  />
                </View>
              </View>
            )}
          </Animated.View>

          {/* Dica */}
          <Animated.View 
            style={[
              styles.dicaContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <Ionicons name="bulb" size={24} color="#ffd700" />
            <Text style={styles.dicaTexto}>{frases[current].dica}</Text>
          </Animated.View>

          {/* Quadrados da palavra */}
          <Animated.View 
            style={[
              styles.palavraContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateX: shakeAnim }]
              }
            ]}
          >
            <View style={styles.quadrados}>
              {palavra.split('').map((_, idx) => (
                <Animated.View 
                  key={idx} 
                  style={[
                    styles.quadrado,
                    input[idx] ? styles.quadradoPreenchido : null
                  ]}
                >
                  <Text style={styles.letraQuadrado}>{input[idx] || ''}</Text>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* Botões de letras */}
          <Animated.View 
            style={[
              styles.letrasContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <View style={styles.letrasGrid}>
              {letras.map((letra, idx) => (
                <TouchableOpacity 
                  key={`${letra}-${idx}`}
                  style={styles.botaoLetra} 
                  onPress={() => handleLetra(letra, idx)}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={['#ffffff', '#f1f2f6']}
                    style={styles.letraGradient}
                  >
                    <Text style={styles.letraBotao}>{letra.toUpperCase()}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Botões de ação */}
          <Animated.View 
            style={[
              styles.acoesContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.botoesSuperiores}>
              <TouchableOpacity 
                style={styles.botaoAcao} 
                onPress={handleApagar}
                activeOpacity={0.8}
              >
                <LinearGradient colors={['#ff7675', '#d63031']} style={styles.botaoGradient}>
                  <Ionicons name="backspace" size={20} color="#fff" />
                  <Text style={styles.textoBotaoAcao}>Apagar</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.botaoAcao, styles.botaoVerificar]} 
                onPress={handleVerificar}
                activeOpacity={0.8}
              >
                <LinearGradient colors={['#00b894', '#00a085']} style={styles.botaoGradient}>
                  <Ionicons name="checkmark-circle" size={20} color="#fff" />
                  <Text style={styles.textoBotaoAcao}>Verificar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.botoesInferiores}>
              <TouchableOpacity 
                style={[
                  styles.botaoAjuda,
                  dicasRestantes <= 0 && styles.botaoDesabilitado
                ]}
                disabled={dicasRestantes <= 0}
                onPress={revelarLetra}
                activeOpacity={0.8}
              >
                <LinearGradient 
                  colors={dicasRestantes > 0 ? ['#fdcb6e', '#e17055'] : ['#b2bec3', '#74b9ff']} 
                  style={styles.botaoGradient}
                >
                  <Ionicons name="eye" size={18} color="#fff" />
                  <Text style={styles.textoBotaoAjuda}>
                    Dica ({dicasRestantes})
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.botaoAjuda,
                  pulosRestantes <= 0 && styles.botaoDesabilitado
                ]}
                disabled={pulosRestantes <= 0}
                onPress={pularPalavra}
                activeOpacity={0.8}
              >
                <LinearGradient 
                  colors={pulosRestantes > 0 ? ['#a29bfe', '#6c5ce7'] : ['#b2bec3', '#74b9ff']} 
                  style={styles.botaoGradient}
                >
                  <Ionicons name="play-skip-forward" size={18} color="#fff" />
                  <Text style={styles.textoBotaoAjuda}>
                    Pular ({pulosRestantes})
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 16,
    fontWeight: '600',
  },
  sucessoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sucessoTitulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  sucessoSubtitulo: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  headerContainer: {
    marginBottom: 24,
  },
  progressoSprint: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  streakText: {
    fontSize: 14,
    color: '#ff6b35',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  progressoBarra: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressoPreenchimento: {
    height: '100%',
    backgroundColor: '#4ecdc4',
    borderRadius: 3,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
  },
  timerTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    marginRight: 12,
    minWidth: 60,
  },
  timerBarra: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  timerPreenchimento: {
    height: '100%',
    borderRadius: 3,
  },
  dicaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  dicaTexto: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
    lineHeight: 24,
  },
  palavraContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  quadrados: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  quadrado: {
    width: Math.min(50, width / 8),
    height: Math.min(50, width / 8),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  quadradoPreenchido: {
    backgroundColor: '#4ecdc4',
    borderColor: '#4ecdc4',
  },
  letraQuadrado: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  letrasContainer: {
    marginBottom: 24,
  },
  letrasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  botaoLetra: {
    width: Math.min(45, width / 9),
    height: Math.min(45, width / 9),
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  letraGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  letraBotao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  acoesContainer: {
    gap: 16,
  },
  botoesSuperiores: {
    flexDirection: 'row',
    gap: 12,
  },
  botaoAcao: {
    flex: 1,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  botaoVerificar: {
    flex: 1.2,
  },
  botaoGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  textoBotaoAcao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  botoesInferiores: {
    flexDirection: 'row',
    gap: 12,
  },
  botaoAjuda: {
    flex: 1,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  botaoDesabilitado: {
    opacity: 0.5,
  },
  textoBotaoAjuda: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

export default JogoPalavras;
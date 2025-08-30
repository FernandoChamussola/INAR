from collections import deque

# Função para converter estado em tupla (imutável -> pode ser usado em set/dict)
def to_tuple(estado):
    return tuple(tuple(linha) for linha in estado)

# Encontra a posição do 0 (espaço vazio)
def encontrar_vazio(estado):
    for i in range(3):
        for j in range(3):
            if estado[i][j] == 0:
                return i, j

# Gera os filhos de um estado
def gerar_filhos(estado):
    i, j = encontrar_vazio(estado)
    movimentos = [(-1,0),(1,0),(0,-1),(0,1)]  # cima, baixo, esquerda, direita
    filhos = []

    for di, dj in movimentos:
        ni, nj = i + di, j + dj
        if 0 <= ni < 3 and 0 <= nj < 3:
            novo = [list(l) for l in estado]  # copia
            novo[i][j], novo[ni][nj] = novo[ni][nj], novo[i][j]  # troca
            filhos.append(novo)

    return filhos

# Reconstrói o caminho até o estado final
def reconstruir_caminho(pais, atual):
    caminho = []
    while atual is not None:
        caminho.append(atual)
        atual = pais.get(to_tuple(atual))
    return caminho[::-1]

# Busca em largura (BFS)
def bfs(inicial, final):
    fila = deque([inicial])
    visitados = set()
    pais = {to_tuple(inicial): None}

    while fila:
        atual = fila.popleft()

        if atual == final:
            return reconstruir_caminho(pais, atual)

        for filho in gerar_filhos(atual):
            filho_t = to_tuple(filho)
            if filho_t not in visitados and filho_t not in pais:
                pais[filho_t] = atual
                fila.append(filho)

        visitados.add(to_tuple(atual))

    return None

# --- PROGRAMA PRINCIPAL ---
def ler_estado(msg):
    print(f"\nDigite o {msg} (3 linhas com 3 números separados por espaço, use 0 para o vazio):")
    estado = []
    for _ in range(3):
        linha = list(map(int, input().split()))
        estado.append(linha)
    return estado

if __name__ == "__main__":
    estado_inicial = ler_estado("estado inicial")
    estado_final = ler_estado("estado final")

    caminho = bfs(estado_inicial, estado_final)

    if caminho:
        print("\nCaminho encontrado:")
        for passo in caminho:
            for linha in passo:
                print(linha)
            print("------")
    else:
        print("Não foi possível encontrar solução.")

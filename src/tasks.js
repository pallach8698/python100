// 100 мини-программ Python для переписывания руками.
// cat: Игры | Приложения | Анимации | Алгоритмы | Текст
// level: 1 лёгкая · 2 средняя · 3 сложная
window.TASKS = [
{id:1,cat:"Игры",level:1,title:"Угадай число",desc:"Классика: компьютер загадывает число от 1 до 100, а ты угадываешь его по подсказкам «больше/меньше».",learn:"переменные, цикл while, условия, random",code:String.raw`import random

secret = random.randint(1, 100)
tries = 0
print('Я загадал число от 1 до 100. Угадаешь?')

while True:
    guess = int(input('Твоя попытка: '))
    tries += 1
    if guess < secret:
        print('Больше!')
    elif guess > secret:
        print('Меньше!')
    else:
        print('Угадал за', tries, 'попыток!')
        break`},
{id:2,cat:"Игры",level:1,title:"Камень, ножницы, бумага",desc:"Игра против компьютера со счётом: победа +1, поражение −1. Игра заканчивается словом «стоп».",learn:"списки, условия, random.choice",code:String.raw`import random

options = ['камень', 'ножницы', 'бумага']
score = 0

while True:
    player = input('камень, ножницы или бумага? (выход — стоп): ').lower()
    if player == 'стоп':
        break
    if player not in options:
        print('Такого варианта нет.')
        continue
    bot = random.choice(options)
    print('Компьютер:', bot)
    if player == bot:
        print('Ничья!')
    elif (player == 'камень' and bot == 'ножницы') or \
         (player == 'ножницы' and bot == 'бумага') or \
         (player == 'бумага' and bot == 'камень'):
        print('Ты выиграл!')
        score += 1
    else:
        print('Ты проиграл!')
        score -= 1
    print('Счёт:', score)`},
{id:3,cat:"Игры",level:2,title:"Виселица",desc:"Отгадай слово по буквам, пока не кончились 6 жизней. Слово выбирается случайно из списка.",learn:"множества, join, цикл while-else",code:String.raw`import random

words = ['питон', 'программа', 'компьютер', 'клавиатура', 'алгоритм']
word = random.choice(words)
guessed = set()
lives = 6

while lives > 0:
    view = ' '.join(c if c in guessed else '_' for c in word)
    print(view)
    if '_' not in view:
        print('Ты отгадал слово!')
        break
    letter = input('Буква: ').lower()
    if letter in word:
        guessed.add(letter)
    else:
        lives -= 1
        print('Нет такой буквы. Осталось жизней:', lives)
else:
    print('Проигрыш! Было слово:', word)`},
{id:4,cat:"Игры",level:3,title:"Крестики-нолики",desc:"Полноценная игра для двух игроков на одном компьютере: поле 3x3, проверка победы и ничьей.",learn:"функции, списки, кортежи, any()",code:String.raw`board = list('123456789')

def show():
    print()
    for r in range(0, 9, 3):
        print(' ' + ' | '.join(board[r:r + 3]))
        if r < 6:
            print('---+---+---')
    print()

lines = [(0,1,2), (3,4,5), (6,7,8),
         (0,3,6), (1,4,7), (2,5,8),
         (0,4,8), (2,4,6)]

def win(mark):
    return any(board[a] == board[b] == board[c] == mark
               for a, b, c in lines)

player = 'X'
moves = 0
while moves < 9:
    show()
    cell = int(input('Ходит ' + player + '. Клетка (1-9): ')) - 1
    if cell not in range(9) or board[cell] in 'XO':
        print('Нельзя ходить сюда!')
        continue
    board[cell] = player
    moves += 1
    if win(player):
        show()
        print('Победил', player + '!')
        break
    player = 'O' if player == 'X' else 'X'
else:
    show()
    print('Ничья!')`},
{id:5,cat:"Игры",level:1,title:"Дуэль кубиков",desc:"Пять раундов бросков кубика против компьютера. Кто выиграл больше раундов — тот чемпион.",learn:"цикл for, f-строки, сравнения",code:String.raw`import random

you = bot = 0
for round_ in range(1, 6):
    input(f'Раунд {round_}. Нажми Enter, чтобы бросить кубик...')
    y = random.randint(1, 6)
    b = random.randint(1, 6)
    print('Ты:', y, '| Компьютер:', b)
    if y > b:
        you += 1
    elif b > y:
        bot += 1

print()
print('Итог — ты:', you, 'компьютер:', bot)
if you > bot:
    print('Победа!')
elif bot > you:
    print('Проигрыш!')
else:
    print('Ничья!')`},
{id:6,cat:"Игры",level:3,title:"Блэкджек 21",desc:"Карточная игра с деньгами и ставками: набирай карты, но не перебери 21. Дилер играет по своим правилам.",learn:"функции, списки, sum(), вложенные циклы",code:String.raw`import random

def card():
    return random.choice([2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11])

money = 100
while money > 0:
    bet = int(input(f'Деньги: {money}. Твоя ставка: '))
    hand = [card(), card()]
    while sum(hand) < 21:
        print('Твои карты:', hand, '=', sum(hand))
        if input('Ещё? (д/н): ') != 'д':
            break
        hand.append(card())
    total = sum(hand)
    if total > 21:
        print('Перебор!', hand)
        money -= bet
        continue
    dealer = [card(), card()]
    while sum(dealer) < 17:
        dealer.append(card())
    print('Дилер:', dealer, '=', sum(dealer))
    if sum(dealer) > 21 or total > sum(dealer):
        print('Ты выиграл!')
        money += bet
    elif total == sum(dealer):
        print('Ничья, ставка возвращена.')
    else:
        print('Дилер сильнее.')
        money -= bet
    if money <= 0:
        print('Ты разорён!')`},
{id:7,cat:"Игры",level:2,title:"Анаграмма",desc:"Программа перемешивает буквы слова, а ты угадываешь, что за слово было изначально. Три попытки.",learn:"random.shuffle, срезы строк, цикл while",code:String.raw`import random

words = ['монитор', 'коридор', 'планета', 'батарея', 'тетрадь']
word = random.choice(words)
mix = list(word)
while True:
    random.shuffle(mix)
    if ''.join(mix) != word:
        break

print('Перемешанные буквы:', ''.join(mix))
tries = 3
while tries > 0:
    answer = input('Какое это слово? ').lower()
    if answer == word:
        print('Верно!')
        break
    tries -= 1
    print('Неверно. Осталось попыток:', tries)
else:
    print('Это было слово:', word)`},
{id:8,cat:"Игры",level:1,title:"Викторина",desc:"Вопросы с подсчётом очков в конце. Легко добавить свои вопросы — просто допиши строку в список.",learn:"списки кортежей, цикл for, strip/lower",code:String.raw`questions = [
    ('Столица Франции?', 'париж'),
    ('Сколько будет 7 * 8?', '56'),
    ('Какой язык мы учим?', 'python'),
    ('Сколько дней в високосном году?', '366'),
]

score = 0
for q, right in questions:
    answer = input(q + ' ').strip().lower()
    if answer == right:
        print('Верно!')
        score += 1
    else:
        print('Нет, правильный ответ:', right)

print()
print('Результат:', score, 'из', len(questions))`},
{id:9,cat:"Игры",level:2,title:"Горячо-холодно",desc:"Угадай число от 1 до 50. Программа подсказывает, теплее ты или холоднее, чем в прошлой попытке.",learn:"абсолютная величина abs(), None, логика подсказок",code:String.raw`import random

secret = random.randint(1, 50)
prev = None
print('Загадано число от 1 до 50.')

while True:
    guess = int(input('Число: '))
    dist = abs(secret - guess)
    if dist == 0:
        print('Точно в цель!')
        break
    if prev is None:
        print('Тепло' if dist <= 10 else 'Холодно')
    else:
        print('Теплее' if dist < prev else 'Холоднее')
    prev = dist`},
{id:10,cat:"Игры",level:1,title:"Орёл или решка",desc:"Десять бросков монеты: угадывай сторону и набирай очки. Проверь свою интуицию!",learn:"random.choice, счётчик, цикл for",code:String.raw`import random

wins = 0
for i in range(10):
    guess = input('Орёл или решка? (о/р): ')
    coin = random.choice(['о', 'р'])
    print('Выпало:', 'орёл' if coin == 'о' else 'решка')
    if guess == coin:
        print('Угадал!')
        wins += 1
    else:
        print('Мимо.')
print('Угадано:', wins, 'из 10')`},
{id:11,cat:"Игры",level:2,title:"Найди корабль",desc:"На поле 6x6 спрятан корабль. После каждого выстрела видно дистанцию до цели. У тебя 8 снарядов.",learn:"координаты, манхэттенское расстояние, цикл for-else",code:String.raw`import random

size = 6
ship_x = random.randrange(size)
ship_y = random.randrange(size)
turns = 8

print(f'На поле {size}x{size} спрятан корабль. У тебя {turns} выстрелов.')
for turn in range(1, turns + 1):
    x = int(input(f'[{turn}/{turns}] Столбец (0-{size - 1}): '))
    y = int(input(f'[{turn}/{turns}] Строка (0-{size - 1}): '))
    if (x, y) == (ship_x, ship_y):
        print('Попадание! Корабль потоплен!')
        break
    dist = abs(x - ship_x) + abs(y - ship_y)
    print('Мимо. Дистанция до цели:', dist)
else:
    print('Снаряды кончились. Корабль был в', ship_x, ship_y)`},
{id:12,cat:"Игры",level:2,title:"Быки и коровы",desc:"Загаданы 3 разные цифры. Бык — цифра на своём месте, корова — цифра есть, но не там.",learn:"random.sample, zip, суммы по условию",code:String.raw`import random

digits = random.sample('0123456789', 3)
print('Я загадал 3 разные цифры.')
print('Бык — цифра на своём месте, корова — цифра есть, но не там.')

while True:
    guess = input('Твой вариант (3 цифры): ')
    bulls = sum(g == d for g, d in zip(guess, digits))
    cows = sum(g in digits for g in guess) - bulls
    print('Быки:', bulls, 'Коровы:', cows)
    if bulls == 3:
        print('Угадано!')
        break`},
{id:13,cat:"Игры",level:1,title:"Чёт-нечет",desc:"Программа показывает число — успей определить, чётное оно или нечётное. Пять раундов на внимательность.",learn:"остаток от деления %, условия",code:String.raw`import random

score = 0
for i in range(5):
    n = random.randint(1, 100)
    guess = input(f'Число {n}: чётное или нечётное? (ч/н): ')
    right = 'ч' if n % 2 == 0 else 'н'
    if guess == right:
        print('Верно!')
        score += 1
    else:
        print('Ошибка!')
print('Очки:', score)`},
{id:14,cat:"Игры",level:1,title:"Пещера дракона",desc:"Мини-квест: две пещеры, в одной клад, в другой дракон. Случайность решает всё… или почти всё.",learn:"ветвления, вложенные условия, random.random",code:String.raw`import random

print('Ты стоишь перед двумя пещерами.')
print('В одной — клад, в другой — голодный дракон.')
choice = input('В какую войдёшь? (1 или 2): ')

good = random.randint(1, 2)
if int(choice) == good:
    print('Внутри горы золота! Ты богат!')
    if random.random() < 0.3:
        print('Бонус: среди золота ты нашёл волшебное кольцо!')
else:
    print('ДРАКОН! Он съедает тебя. Конец игры.')`},
{id:15,cat:"Игры",level:2,title:"Компьютер угадывает число",desc:"Разворачиваем «Угадай число»: теперь ты загадываешь, а компьютер отгадывает бинарным поиском.",learn:"бинарный поиск, границы low/high, цикл while",code:String.raw`print('Загадай число от 1 до 100, а я его угадаю.')
low, high = 1, 100
tries = 0

while True:
    guess = (low + high) // 2
    tries += 1
    answer = input(f'Это {guess}? (да/больше/меньше): ')
    if answer == 'да':
        print('Угадал за', tries, 'попыток!')
        break
    elif answer == 'больше':
        low = guess + 1
    elif answer == 'меньше':
        high = guess - 1
    else:
        print('Отвечай: да, больше или меньше.')`},
{id:16,cat:"Игры",level:2,title:"Гонка улиток",desc:"Три улитки ползут по дорожке из 30 клеток. Каждый шаг — случайный. Кто первый доползёт?",learn:"словари, time.sleep, вложенные циклы",code:String.raw`import random, time

track = 30
snails = {'А': 0, 'Б': 0, 'В': 0}

while True:
    for name in snails:
        snails[name] += random.randint(0, 2)
    print('-' * (track + 10))
    for name, pos in snails.items():
        print(name, ' ' * min(pos, track) + '@')
    time.sleep(0.3)
    winner = [n for n, p in snails.items() if p >= track]
    if winner:
        print('Победила улитка', winner[0] + '!')
        break`},
{id:17,cat:"Игры",level:2,title:"Не перебери 50",desc:"Двое игроков по очереди бросают кубик, сумма растёт. Проигрывает тот, после чьего броска сумма превысит 50.",learn:"смена игрока, накопление суммы, цикл while",code:String.raw`import random

total = 0
player = 1
print('Игроки по очереди бросают кубик.')
print('Проигрывает тот, после кого сумма превысит 50.')
while True:
    input(f'Игрок {player}, жми Enter для броска...')
    roll = random.randint(1, 6)
    total += roll
    print('Выпало', roll, '→ сумма', total)
    if total > 50:
        print('Игрок', player, 'проиграл!')
        break
    player = 2 if player == 1 else 1`},
{id:18,cat:"Игры",level:2,title:"Найди клад",desc:"Клад зарыт на поле 8x8. После каждой попытки компас подсказывает направление: север, юг, запад, восток.",learn:"составные строки, сравнение координат, for-else",code:String.raw`import random

treasure_x = random.randrange(8)
treasure_y = random.randrange(8)
turns = 10

print('Клад зарыт на поле 8x8. Подсказка покажет направление.')
for turn in range(1, turns + 1):
    x = int(input(f'[{turn}/{turns}] Координата X (0-7): '))
    y = int(input(f'[{turn}/{turns}] Координата Y (0-7): '))
    if (x, y) == (treasure_x, treasure_y):
        print('КЛАД НАЙДЕН!')
        break
    hint = ''
    if treasure_x > x:
        hint += 'восточнее '
    elif treasure_x < x:
        hint += 'западнее '
    if treasure_y > y:
        hint += 'южнее'
    elif treasure_y < y:
        hint += 'севернее'
    print('Клад', hint)
else:
    print('Ходы кончились. Клад был на', treasure_x, treasure_y)`},
{id:19,cat:"Игры",level:2,title:"Слот-машина",desc:"Три барабана с символами. Пара даёт +10 монет, три семёрки — джекпот. Хватит ли тебе 50 стартовых монет?",learn:"списковые включения, сравнение элементов списка",code:String.raw`import random

symbols = ['A', 'B', 'C', '7']
money = 50

while money >= 5:
    print('Баланс:', money)
    if input('Крутить за 5 монет? (д/н): ') != 'д':
        break
    money -= 5
    roll = [random.choice(symbols) for _ in range(3)]
    print(' | '.join(roll))
    if roll[0] == roll[1] == roll[2]:
        win = 50 if roll[0] == '7' else 20
        print('ДЖЕКПОТ! +', win)
        money += win
    elif roll[0] == roll[1] or roll[1] == roll[2] or roll[0] == roll[2]:
        print('Пара! +10')
        money += 10
print('Игра окончена. У тебя', money, 'монет.')`},
{id:20,cat:"Игры",level:1,title:"Математическая дуэль",desc:"Пять примеров на сложение, вычитание и умножение. Реши все и докажи, что ты быстрее калькулятора.",learn:"random.choice, eval, генерация примеров",code:String.raw`import random

score = 0
rounds = 5
for i in range(rounds):
    a, b = random.randint(2, 12), random.randint(2, 12)
    op = random.choice(['+', '-', '*'])
    right = eval(f'{a} {op} {b}')
    answer = int(input(f'Сколько будет {a} {op} {b}? '))
    if answer == right:
        print('Верно!')
        score += 1
    else:
        print('Нет, ответ:', right)
print('Решено правильно:', score, 'из', rounds)`},
{id:21,cat:"Игры",level:3,title:"Слово из букв",desc:"Семь случайных букв — составь из них самое длинное слово. Программа проверит, что ты не сжульничал.",learn:"count, all, генераторные выражения",code:String.raw`import random

letters = random.sample('аеклнорсту', 7)
print('Составь самое длинное слово из букв:', ' '.join(letters))

word = input('Твоё слово: ').lower()
ok = all(word.count(c) <= letters.count(c) for c in word)
if ok and len(word) >= 2:
    print('Принято! Длина слова:', len(word))
    print('Попробуй в следующий раз придумать длиннее!')
else:
    print('В слове есть буквы, которых нет в наборе.')`},
{id:22,cat:"Игры",level:2,title:"Поймай букву",desc:"Тест на реакцию: через случайную паузу появляется буква — введи её как можно быстрее. Пять раундов.",learn:"time.time, random.uniform, замер скорости",code:String.raw`import random, time

print('Когда появится буква, введи её как можно быстрее. 5 раундов.')
time.sleep(1)
total = 0
for i in range(5):
    letter = random.choice('фывапролджэ')
    delay = random.uniform(1, 3)
    time.sleep(delay)
    start = time.time()
    answer = input(f'БУКВА: {letter} >>> ')
    reaction = time.time() - start
    if answer == letter:
        print('Попал! Реакция:', round(reaction, 2), 'с')
        total += reaction
    else:
        print('Мимо! Это была буква', letter)
        total += 3
print('Средняя реакция:', round(total / 5, 2), 'с')`},
{id:23,cat:"Игры",level:2,title:"Рулетка",desc:"Ставь на чёт или нечет. Выпадет зеро — ставка сгорает. Стартовый капитал: 100 монет.",learn:"логические выражения, сравнение булевых значений",code:String.raw`import random

money = 100
while money > 0:
    bet = int(input(f'Баланс: {money}. Ставка (0 — выход): '))
    if bet == 0:
        break
    kind = input('На что ставишь? (чёт/нечет): ')
    n = random.randint(0, 36)
    print('Выпало:', n)
    if n == 0:
        print('Зеро! Ставка сгорела.')
        money -= bet
    elif (n % 2 == 0) == (kind == 'чёт'):
        print('Выигрыш!')
        money += bet
    else:
        print('Проигрыш.')
        money -= bet
print('Ты уходишь с', money)`},
{id:24,cat:"Игры",level:2,title:"Текстовый бой",desc:"Поединок с врагом: у каждого по 30 жизней, удары наносят случайный урон. Кто падёт первым?",learn:"цикл с двумя условиями, max(), случайный урон",code:String.raw`import random

hero_hp = 30
enemy_hp = 30

print('БИТВА! У тебя и у врага по 30 жизней.')
while hero_hp > 0 and enemy_hp > 0:
    input('Нажми Enter, чтобы ударить...')
    hit = random.randint(1, 8)
    enemy_hp -= hit
    print('Ты наносишь', hit, 'урона. У врага осталось:', max(enemy_hp, 0))
    if enemy_hp <= 0:
        break
    hit = random.randint(1, 8)
    hero_hp -= hit
    print('Враг отвечает на', hit, '. У тебя осталось:', max(hero_hp, 0))

print('ПОБЕДА!' if hero_hp > 0 else 'Ты пал в бою...')`},
{id:25,cat:"Игры",level:3,title:"Лабиринт",desc:"Ходи героем @ по ASCII-лабиринту клавишами w/a/s/d и найди выход — звёздочку.",learn:"списки строк, координаты, словарь ходов",code:String.raw`maze = [
    '#########',
    '#..#....#',
    '#..#..#.#',
    '#.....#.#',
    '###.#.#.#',
    '#...#...#',
    '#.#####.#',
    '#.......#',
    '#########',
]
x, y = 1, 1
exit_x, exit_y = 7, 7
moves = {'w': (0, -1), 's': (0, 1), 'a': (-1, 0), 'd': (1, 0)}

while True:
    for row_i, row in enumerate(maze):
        line = ''
        for col_i, cell in enumerate(row):
            if (col_i, row_i) == (x, y):
                line += '@'
            elif (col_i, row_i) == (exit_x, exit_y):
                line += '*'
            else:
                line += cell
        print(line)
    if (x, y) == (exit_x, exit_y):
        print('Ты выбрался из лабиринта!')
        break
    key = input('Ход (w/a/s/d): ')
    dx, dy = moves.get(key, (0, 0))
    if maze[y + dy][x + dx] == '.':
        x, y = x + dx, y + dy`},
{id:26,cat:"Приложения",level:1,title:"Калькулятор",desc:"Считает примеры вида «2 + 3» со всеми четырьмя действиями и защитой от деления на ноль.",learn:"split, float, elif",code:String.raw`print('Калькулятор: +  -  *  /  (стоп — выход)')
while True:
    expr = input('Пример (например, 2 + 3): ')
    if expr == 'стоп':
        break
    a, op, b = expr.split()
    a, b = float(a), float(b)
    if op == '+':
        print('=', a + b)
    elif op == '-':
        print('=', a - b)
    elif op == '*':
        print('=', a * b)
    elif op == '/':
        if b == 0:
            print('На ноль делить нельзя!')
        else:
            print('=', a / b)`},
{id:27,cat:"Приложения",level:2,title:"Список дел",desc:"Добавляй дела, смотри список и отмечай выполненные по номеру. Всё хранится в списке в памяти.",learn:"списки, enumerate, pop, startswith",code:String.raw`tasks = []
while True:
    print('--- Дел в списке:', len(tasks))
    for i, t in enumerate(tasks, 1):
        print(i, t)
    cmd = input('добавить / готово N / выход: ')
    if cmd == 'выход':
        break
    elif cmd == 'добавить':
        tasks.append(input('Что сделать? '))
    elif cmd.startswith('готово '):
        n = int(cmd.split()[1])
        if 1 <= n <= len(tasks):
            print('Выполнено:', tasks.pop(n - 1))
        else:
            print('Нет дела с таким номером.')`},
{id:28,cat:"Приложения",level:1,title:"Генератор паролей",desc:"Собери пароль нужной длины из букв, цифр и символов — по твоим настройкам.",learn:"string.ascii_letters, join, генераторы",code:String.raw`import random, string

length = int(input('Длина пароля: '))
use_digits = input('Цифры? (д/н): ') == 'д'
use_symbols = input('Символы? (д/н): ') == 'д'

chars = string.ascii_letters
if use_digits:
    chars += string.digits
if use_symbols:
    chars += '!#$%&*+-=?@'

password = ''.join(random.choice(chars) for _ in range(length))
print('Твой пароль:', password)`},
{id:29,cat:"Приложения",level:1,title:"Секундомер",desc:"Запускается по Enter, останавливается по Enter и показывает, сколько прошло секунд и минут.",learn:"time.time, разность времён",code:String.raw`import time

input('Нажми Enter, чтобы запустить секундомер...')
start = time.time()
input('Секундомер идёт. Нажми Enter, чтобы остановить.')
elapsed = time.time() - start
print('Прошло:', round(elapsed, 2), 'секунд')
print('Это', round(elapsed / 60, 2), 'минут')`},
{id:30,cat:"Приложения",level:1,title:"Таймер обратного отсчёта",desc:"Введи число секунд — таймер будет обновлять одну и ту же строку до нуля, а потом крикнет «ВРЕМЯ ВЫШЛО!».",learn:"end= и возврат каретки \\r, time.sleep",code:String.raw`import time

seconds = int(input('Сколько секунд ждать? '))
while seconds > 0:
    print('Осталось:', seconds, 'с ', end='\r')
    time.sleep(1)
    seconds -= 1
print('ВРЕМЯ ВЫШЛО!' + ' ' * 20)`},
{id:31,cat:"Приложения",level:1,title:"Конвертер величин",desc:"Километры в мили, килограммы в фунты и обратно — четыре конвертации в одной программе.",learn:"меню на if-elif, round",code:String.raw`print('1 — км в мили')
print('2 — мили в км')
print('3 — кг в фунты')
print('4 — фунты в кг')
choice = input('Выбери: ')
value = float(input('Значение: '))

if choice == '1':
    print(value, 'км =', round(value * 0.621371, 2), 'мили')
elif choice == '2':
    print(value, 'мили =', round(value / 0.621371, 2), 'км')
elif choice == '3':
    print(value, 'кг =', round(value * 2.20462, 2), 'фунтов')
elif choice == '4':
    print(value, 'фунтов =', round(value / 2.20462, 2), 'кг')
else:
    print('Нет такого пункта меню.')`},
{id:32,cat:"Приложения",level:2,title:"Шифр Цезаря",desc:"Шифрует любой русский текст сдвигом по алфавиту. Тот же код с отрицательным сдвигом расшифрует текст обратно.",learn:"index, остаток от деления, перебор строки",code:String.raw`alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя'
text = input('Текст: ').lower()
shift = int(input('Сдвиг (например, 3): '))

result = ''
for ch in text:
    if ch in alphabet:
        result += alphabet[(alphabet.index(ch) + shift) % len(alphabet)]
    else:
        result += ch
print('Результат:', result)`},
{id:33,cat:"Приложения",level:1,title:"Счётчик слов",desc:"Считает слова, символы и находит самое длинное слово в любом введённом тексте.",learn:"split, len, max с key",code:String.raw`text = input('Введи текст: ')
words = text.split()
print('Слов:', len(words))
print('Символов:', len(text))
print('Символов без пробелов:', len(text.replace(' ', '')))
if words:
    print('Самое длинное слово:', max(words, key=len))`},
{id:34,cat:"Приложения",level:2,title:"Заметки с сохранением",desc:"Заметки записываются в файл zametki.txt и не теряются после закрытия программы.",learn:"open, with, encoding, FileNotFoundError",code:String.raw`FILENAME = 'zametki.txt'

while True:
    cmd = input('новая / список / выход: ')
    if cmd == 'выход':
        break
    elif cmd == 'новая':
        note = input('Текст заметки: ')
        with open(FILENAME, 'a', encoding='utf-8') as f:
            f.write(note + '\n')
        print('Сохранено!')
    elif cmd == 'список':
        try:
            with open(FILENAME, encoding='utf-8') as f:
                print('--- Твои заметки ---')
                print(f.read())
        except FileNotFoundError:
            print('Заметок пока нет.')`},
{id:35,cat:"Приложения",level:1,title:"Телефонная книга",desc:"Контакты в словаре: добавляй, ищи по имени и выводи весь список.",learn:"словари, get, items",code:String.raw`contacts = {}
while True:
    cmd = input('добавить / найти / все / выход: ')
    if cmd == 'выход':
        break
    elif cmd == 'добавить':
        name = input('Имя: ')
        contacts[name] = input('Телефон: ')
    elif cmd == 'найти':
        name = input('Имя: ')
        print(contacts.get(name, 'Такого контакта нет.'))
    elif cmd == 'все':
        for name, phone in contacts.items():
            print(name, '—', phone)`},
{id:36,cat:"Приложения",level:1,title:"Конвертер температур",desc:"Из градусов Цельсия в Фаренгейты и Кельвины одной формулой.",learn:"арифметика, round, float",code:String.raw`c = float(input('Градусы Цельсия: '))
f = c * 9 / 5 + 32
k = c + 273.15
print(c, '°C =', round(f, 1), '°F =', round(k, 1), 'K')`},
{id:37,cat:"Приложения",level:1,title:"Калькулятор чаевых",desc:"Считает чаевые по проценту и делит итоговый счёт на всю компанию.",learn:"проценты, деление, порядок операций",code:String.raw`bill = float(input('Сумма счёта: '))
percent = float(input('Процент чаевых: '))
people = int(input('Сколько человек делят счёт: '))

tips = bill * percent / 100
total = bill + tips
print('Чаевые:', round(tips, 2))
print('Итого:', round(total, 2))
print('С каждого:', round(total / people, 2))`},
{id:38,cat:"Приложения",level:1,title:"Индекс массы тела",desc:"Введи вес и рост — программа посчитает ИМТ и подскажет, в норме ли он.",learn:"степень **, диапазоны в elif",code:String.raw`weight = float(input('Вес в кг: '))
height = float(input('Рост в метрах (например, 1.75): '))
bmi = weight / height ** 2
print('Твой ИМТ:', round(bmi, 1))
if bmi < 18.5:
    print('Недостаток веса')
elif bmi < 25:
    print('Норма')
elif bmi < 30:
    print('Избыточный вес')
else:
    print('Ожирение')`},
{id:39,cat:"Приложения",level:1,title:"Генератор никнеймов",desc:"Склеивает случайное прилагательное, животное и число. «ГрозныйЁж42» — почему бы и нет?",learn:"склейка строк, random.choice, str",code:String.raw`import random

starts = ['Тёмный', 'Быстрый', 'Сонный', 'Хитрый', 'Грозный']
animals = ['Лис', 'Волк', 'Ёж', 'Дракон', 'Кот']

print('Генератор никнеймов. Пустая строка — выход.')
while True:
    if input('Ещё ник? (Enter — да, что-то ввести — выход): ') != '':
        break
    nick = random.choice(starts) + random.choice(animals) + str(random.randint(1, 99))
    print('→', nick)`},
{id:40,cat:"Приложения",level:3,title:"Учёт расходов",desc:"Записывает траты в файл и считает итог. Формат строки: «что;сколько».",learn:"файлы, разбор строк split, накопление суммы",code:String.raw`FILENAME = 'rashody.txt'

while True:
    cmd = input('потратил / итог / выход: ')
    if cmd == 'выход':
        break
    elif cmd == 'потратил':
        what = input('На что? ')
        how = input('Сколько? ')
        with open(FILENAME, 'a', encoding='utf-8') as f:
            f.write(what + ';' + how + '\n')
    elif cmd == 'итог':
        total = 0
        try:
            with open(FILENAME, encoding='utf-8') as f:
                for line in f:
                    what, how = line.strip().split(';')
                    total += float(how)
                    print(what, how)
            print('Всего потрачено:', total)
        except FileNotFoundError:
            print('Расходов пока нет.')`},
{id:41,cat:"Приложения",level:1,title:"Календарь месяца",desc:"Красивый календарь любого месяца любого года — одной строкой благодаря модулю calendar.",learn:"модуль calendar, готовые модули Python",code:String.raw`import calendar

year = int(input('Год: '))
month = int(input('Месяц (1-12): '))
print()
print(calendar.month(year, month))`},
{id:42,cat:"Приложения",level:2,title:"Возраст в днях",desc:"Сколько дней, часов и минут ты уже живёшь? Модуль datetime посчитает честно, с високосными годами.",learn:"datetime.date, разность дат",code:String.raw`from datetime import date

y = int(input('Год рождения: '))
m = int(input('Месяц: '))
d = int(input('День: '))

days = (date.today() - date(y, m, d)).days
print('Ты живёшь уже', days, 'дней!')
print('Это примерно', days * 24, 'часов')
print('или', days * 24 * 60, 'минут')`},
{id:43,cat:"Приложения",level:1,title:"До Нового года",desc:"Считает, сколько дней осталось до ближайшего Нового года. Работает в любой день любого года.",learn:"datetime, конструирование дат",code:String.raw`from datetime import date

today = date.today()
ny = date(today.year + 1, 1, 1)
left = (ny - today).days
print('До Нового года осталось', left, 'дней!')
if left <= 31:
    print('Уже можно доставать мандарины!')`},
{id:44,cat:"Приложения",level:3,title:"Кубики для настолок",desc:"Понимает нотацию из D&D: 2d6+3 бросит два шестигранных кубика и прибавит три.",learn:"разбор строк, replace, split, вложенные циклы",code:String.raw`import random

print('Формат броска: 2d6+1 — два шестигранника плюс один.')
print('Слово «выход» — конец работы.')
while True:
    cmd = input('> ')
    if cmd == 'выход':
        break
    parts = cmd.replace('-', '+-').split('+')
    total = 0
    for part in parts:
        if 'd' in part:
            count, sides = part.split('d')
            for _ in range(int(count or 1)):
                total += random.randint(1, int(sides))
        elif part:
            total += int(part)
    print('Выпало:', total)`},
{id:45,cat:"Приложения",level:1,title:"Таблица умножения",desc:"Печатает ровную таблицу умножения до любого числа — колонки выравниваются сами.",learn:"вложенные циклы, rjust",code:String.raw`n = int(input('До какого числа таблица? (например, 9): '))
for i in range(1, n + 1):
    row = ''
    for j in range(1, n + 1):
        row += str(i * j).rjust(4)
    print(row)`},
{id:46,cat:"Приложения",level:1,title:"Лотерейный билет",desc:"Генерирует билет без повторяющихся чисел — как в настоящей лотерее «6 из 49».",learn:"random.sample, sorted, range",code:String.raw`import random

count = int(input('Сколько чисел в билете? (например, 6): '))
max_num = int(input('Из скольки? (например, 49): '))
ticket = sorted(random.sample(range(1, max_num + 1), count))
print('Твой билет:', ticket)`},
{id:47,cat:"Приложения",level:1,title:"Проверка палиндрома",desc:"Понимает, читается ли фраза одинаково в обе стороны, игнорируя пробелы и регистр.",learn:"срезы [::-1], isalpha, генераторы",code:String.raw`text = input('Слово или фраза: ').lower()
clean = ''.join(c for c in text if c.isalpha())
if clean == clean[::-1]:
    print('Это палиндром!')
else:
    print('Обычный текст.')`},
{id:48,cat:"Приложения",level:2,title:"Частотный анализ",desc:"Считает, сколько раз встречается каждая буква, и рисует горизонтальную гистограмму.",learn:"словарь частот, sorted с key, lambda",code:String.raw`text = input('Введи текст: ').lower()
freq = {}
for ch in text:
    if ch.isalpha():
        freq[ch] = freq.get(ch, 0) + 1

for ch, n in sorted(freq.items(), key=lambda p: -p[1]):
    print(ch, '|', '*' * n, n)`},
{id:49,cat:"Приложения",level:1,title:"Помодоро-таймер",desc:"Техника «помидора»: сначала работа, потом отдых. Время задаёшь в минутах сам.",learn:"time.sleep, перевод минут в секунды",code:String.raw`import time

work = float(input('Сколько минут работать? (обычно 25): ')) * 60
rest = float(input('Сколько минут отдыхать? (обычно 5): ')) * 60

print('РАБОТАЕМ! Таймер запущен.')
time.sleep(work)
print('Работа окончена. ОТДЫХАЕМ!')
time.sleep(rest)
print('Помидор готов! Запусти программу ещё раз для следующего.')`},
{id:50,cat:"Приложения",level:2,title:"Опросник",desc:"Задаёт вопросы и дописывает ответы в файл — так можно собирать анкеты целого класса.",learn:"дозапись в файл, список вопросов, цикл",code:String.raw`FILENAME = 'otvety.txt'
questions = ['Как тебя зовут?',
             'Сколько тебе лет?',
             'Твой любимый предмет?']

with open(FILENAME, 'a', encoding='utf-8') as f:
    for q in questions:
        answer = input(q + ' ')
        f.write(q + ' ' + answer + '\n')
    f.write('---\n')
print('Спасибо! Ответы сохранены в файл', FILENAME)`},
{id:51,cat:"Анимации",level:1,title:"Падающий снег",desc:"Бесконечный снегопад из звёздочек. Каждая строка — новый кадр. Остановить — Ctrl+C.",learn:"генератор случайных строк, random.random",code:String.raw`import random, time

width = 60
while True:
    line = ''.join('*' if random.random() < 0.08 else ' '
                   for _ in range(width))
    print(line)
    time.sleep(0.1)`},
{id:52,cat:"Анимации",level:2,title:"Мерцающие звёзды",desc:"Пятнадцать звёзд на небе меняют яркость: точка, звёздочка, плюсик. Настоящий космос в консоли.",learn:"список как экран, замена символов",code:String.raw`import random, time

stars = [random.randrange(60) for _ in range(15)]
while True:
    sky = [' '] * 60
    for s in stars:
        sky[s] = random.choice('.*+')
    print(''.join(sky))
    time.sleep(0.25)`},
{id:53,cat:"Анимации",level:1,title:"Бегущая строка",desc:"Твой текст проплывает через экран справа налево, как табло на вокзале.",learn:"срезы строк, сдвиг окна",code:String.raw`import time

text = input('Что напечатать? ')
text = ' ' * 40 + text + ' ' * 40
for i in range(len(text)):
    print(text[i:i + 40])
    time.sleep(0.08)`},
{id:54,cat:"Анимации",level:1,title:"Полоса загрузки",desc:"Классический прогресс-бар с процентами, который обновляется на одной строке.",learn:"end=\\r, умножение строк, проценты",code:String.raw`import time

total = 30
for i in range(total + 1):
    done = '#' * i
    left = '.' * (total - i)
    percent = round(i / total * 100)
    print('[' + done + left + ']', percent, '%', end='\r')
    time.sleep(0.1)
print()
print('Загрузка завершена!')`},
{id:55,cat:"Анимации",level:3,title:"Летающий логотип",desc:"Тот самый заставочный логотип, который летает по экрану и отскакивает от стенок.",learn:"движение dx/dy, отражение от границ",code:String.raw`import time

W, H = 40, 12
x, y = 0, 0
dx, dy = 1, 1

while True:
    print('\n' * 30)
    for row in range(H):
        if row == y:
            print(' ' * x + '[DVD]')
        else:
            print()
    x += dx
    y += dy
    if x <= 0 or x + 5 >= W:
        dx = -dx
    if y <= 0 or y >= H - 1:
        dy = -dy
    time.sleep(0.15)`},
{id:56,cat:"Анимации",level:2,title:"Цифровой дождь",desc:"Столбики нулей и единиц падают вниз, как в «Матрице». Каждая колонка живёт своей жизнью.",learn:"список состояний, вероятность перезапуска",code:String.raw`import random, time

width = 50
drops = [random.randrange(-10, 0) for _ in range(width)]

while True:
    line = ''
    for i in range(width):
        drops[i] += 1
        if drops[i] > 10 and random.random() < 0.05:
            drops[i] = 0
        if drops[i] > 8:
            line += str(random.randint(0, 1))
        else:
            line += ' '
    print(line)
    time.sleep(0.1)`},
{id:57,cat:"Анимации",level:2,title:"Пульс",desc:"Волна бежит по строке, как линия на кардиограмме. Чистая математика — и красиво.",learn:"math.sin, math.exp, построение строки",code:String.raw`import math, time

width = 60
t = 0
while True:
    line = ''
    for x in range(width):
        v = math.sin((x + t) * 0.4) * math.exp(-abs(x - width / 2) * 0.05)
        line += '#' if v > 0.3 else '.'
    print(line)
    t += 1
    time.sleep(0.08)`},
{id:58,cat:"Анимации",level:1,title:"Цифровые часы",desc:"Текущее время, обновляющееся каждую секунду на одной строке. Просто, но почему-то завораживает.",learn:"time.strftime, обновление строки",code:String.raw`import time

while True:
    now = time.strftime('%H:%M:%S')
    print('Сейчас:', now, end='\r')
    time.sleep(1)`},
{id:59,cat:"Анимации",level:1,title:"Спиннер ожидания",desc:"Крутящаяся палочка из четырёх символов — как индикатор загрузки в настоящих программах.",learn:"остаток от деления для зацикливания",code:String.raw`import time

frames = '|/-\\'
i = 0
while True:
    print('Загружаю...', frames[i % 4], end='\r')
    i += 1
    time.sleep(0.1)`},
{id:60,cat:"Анимации",level:2,title:"Синус-волна",desc:"Несколько волн бегут одна за другой со сдвигом фазы. Похоже на море, нарисованное текстом.",learn:"math.sin, сдвиг фазы, вложенные циклы",code:String.raw`import math, time

t = 0
while True:
    for row in range(8):
        line = ''
        for x in range(50):
            y = int(4 + 3 * math.sin((x + t + row * 4) * 0.2))
            line += '~' if y == row else ' '
        print(line)
    print()
    t += 1
    time.sleep(0.1)`},
{id:61,cat:"Анимации",level:3,title:"Фейерверк",desc:"Салют в консоли: кольцо из звёздочек расширяется от центра и рассыпается. Потом — новый залп.",learn:"math.hypot, кольца, случайное гашение",code:String.raw`import math, random, time

while True:
    cx, cy = 30, 6
    for radius in range(1, 15, 3):
        print('\n' * 5)
        for y in range(14):
            line = ''
            for x in range(60):
                d = math.hypot((x - cx) / 2, y - cy)
                if abs(d - radius) < 0.6 and random.random() < 0.8:
                    line += '*'
                else:
                    line += ' '
            print(line)
        time.sleep(0.2)
    print('БАБАХ!')
    time.sleep(1)`},
{id:62,cat:"Анимации",level:3,title:"Костёр",desc:"Пламя из символов разной «жарости»: чем выше и дальше от центра — тем слабее огонь.",learn:"тепловая модель, clamp значений",code:String.raw`import random, time

flames = ' .:*#'
while True:
    for row in range(8, 0, -1):
        line = ''
        for x in range(30):
            heat = row / 8 + random.random() * 0.4 - abs(x - 15) * 0.04
            idx = max(0, min(4, int(heat * 5)))
            line += flames[idx]
        print(line)
    print('=' * 30)
    time.sleep(0.15)`},
{id:63,cat:"Анимации",level:2,title:"Цветная спираль",desc:"Черепашка turtle рисует радужную спираль из 200 отрезков. Нужен turtle — он встроен в Python.",learn:"turtle, forward/left, цвета по кругу",code:String.raw`import turtle

t = turtle.Turtle()
t.speed(0)
colors = ['red', 'orange', 'yellow', 'green', 'blue']

for i in range(200):
    t.pencolor(colors[i % 5])
    t.forward(i)
    t.left(59)

turtle.done()`},
{id:64,cat:"Анимации",level:2,title:"Квадратная роза",desc:"36 квадратов, повёрнутых на 10 градусов друг от друга, складываются в геометрический узор.",learn:"turtle, вложенные циклы, повороты",code:String.raw`import turtle

t = turtle.Turtle()
t.speed(0)

for i in range(36):
    for _ in range(4):
        t.forward(100)
        t.left(90)
    t.left(10)

turtle.done()`},
{id:65,cat:"Анимации",level:1,title:"Звезда одной линией",desc:"Пятиконечная звезда рисуется, не отрывая пера: всего пять отрезков и магия угла 144°.",learn:"turtle, геометрия углов",code:String.raw`import turtle

t = turtle.Turtle()
t.speed(3)
t.pensize(3)

for _ in range(5):
    t.forward(200)
    t.right(144)

turtle.done()`},
{id:66,cat:"Анимации",level:2,title:"Розетка из кругов",desc:"Сколько лепестков скажешь — столько и нарисует. Круги черепашки складываются в цветок.",learn:"turtle.circle, деление полного угла",code:String.raw`import turtle

t = turtle.Turtle()
t.speed(0)
sides = int(input('Сколько лепестков? '))

for i in range(sides):
    t.circle(80)
    t.left(360 / sides)

turtle.done()`},
{id:67,cat:"Анимации",level:1,title:"Печатная машинка",desc:"Текст появляется по букве, как в старых фильмах про хакеров. Секрет — flush=True.",learn:"end=, flush, посимвольный вывод",code:String.raw`import time

text = input('Что напечатать? ')
for ch in text:
    print(ch, end='', flush=True)
    time.sleep(0.06)
print()`},
{id:68,cat:"Анимации",level:3,title:"Азбука Морзе",desc:"Переводит русский текст в точки и тире и «передаёт» его с паузами, как телеграф.",learn:"словарь-соответствие, посимвольный обход",code:String.raw`import time

morse = {'а': '.-', 'б': '-...', 'в': '.--', 'г': '--.', 'д': '-..',
         'е': '.', 'ж': '...-', 'з': '--..', 'и': '..', 'й': '.---',
         'к': '-.-', 'л': '.-..', 'м': '--', 'н': '-.', 'о': '---',
         'п': '.--.', 'р': '.-.', 'с': '...', 'т': '-', 'у': '..-',
         'ф': '..-.', 'х': '....', 'ц': '-.-.', 'ч': '---.', 'ш': '----',
         'щ': '--.-', 'ъ': '--.--', 'ы': '-.--', 'ь': '-..-', 'э': '..-..',
         'ю': '..--', 'я': '.-.-'}

text = input('Текст для передачи: ').lower()
for ch in text:
    if ch == ' ':
        print('   ', end='')
        time.sleep(0.5)
    elif ch in morse:
        print(morse[ch] + ' ', end='', flush=True)
        time.sleep(0.3)
print()`},
{id:69,cat:"Анимации",level:3,title:"Пузырьки в стакане",desc:"Пузырьки воздуха рождаются на дне стакана и поднимаются вверх. Настоящая мини-симуляция.",learn:"список частиц, обновление состояния",code:String.raw`import random, time

W, H = 20, 8
bubbles = []
while True:
    if random.random() < 0.4:
        bubbles.append([random.randrange(W), H - 1])
    print()
    for y in range(H):
        line = ''.join('o' if [x, y] in bubbles else ' '
                       for x in range(W))
        print('|' + line + '|')
    print('+' + '-' * W + '+')
    bubbles = [[x, y - 1] for x, y in bubbles if y > 0]
    time.sleep(0.25)`},
{id:70,cat:"Анимации",level:2,title:"Океан",desc:"Пять рядов волн с разной фазой — смотрится как настоящее набегающее море.",learn:"синус с несколькими параметрами",code:String.raw`import math, time

t = 0
while True:
    for row in range(5):
        line = ''
        for x in range(60):
            wave = math.sin((x + t * 2 + row * 3) * 0.2)
            if wave > 0.5:
                line += '~'
            elif wave > 0:
                line += '-'
            else:
                line += ' '
        print(line)
    print()
    t += 1
    time.sleep(0.15)`},
{id:71,cat:"Алгоритмы",level:1,title:"Числа Фибоначчи",desc:"Каждое число — сумма двух предыдущих: 0, 1, 1, 2, 3, 5, 8… Красивая последовательность в четыре строки.",learn:"одновременное присваивание a, b = b, a+b",code:String.raw`n = int(input('Сколько чисел Фибоначчи вывести? '))
a, b = 0, 1
for _ in range(n):
    print(a, end=' ')
    a, b = b, a + b
print()`},
{id:72,cat:"Алгоритмы",level:2,title:"Проверка простого числа",desc:"Простое число делится только на себя и единицу. Проверять делители достаточно до корня из числа.",learn:"for-else, корень числа, оптимизация",code:String.raw`n = int(input('Число: '))
if n < 2:
    print('Не простое')
else:
    for d in range(2, int(n ** 0.5) + 1):
        if n % d == 0:
            print('Составное: делится на', d)
            break
    else:
        print('Простое число!')`},
{id:73,cat:"Алгоритмы",level:2,title:"Решето Эратосфена",desc:"Древний способ найти все простые числа разом: вычёркиваем кратные — остаются только простые.",learn:"список флагов, срезы с шагом",code:String.raw`n = int(input('Простые числа до: '))
sieve = [True] * (n + 1)
sieve[0] = sieve[1] = False
for i in range(2, int(n ** 0.5) + 1):
    if sieve[i]:
        for j in range(i * i, n + 1, i):
            sieve[j] = False
primes = [i for i, ok in enumerate(sieve) if ok]
print(primes)
print('Всего:', len(primes))`},
{id:74,cat:"Алгоритмы",level:1,title:"Факториал двумя способами",desc:"5! = 1·2·3·4·5 = 120. Сначала считаем циклом, потом рекурсией — и сравниваем результаты.",learn:"рекурсия, функция с условием выхода",code:String.raw`n = int(input('Число: '))
result = 1
for i in range(2, n + 1):
    result *= i
print(n, '! =', result)

def fact(x):
    return 1 if x <= 1 else x * fact(x - 1)

print('Проверка рекурсией:', fact(n))`},
{id:75,cat:"Алгоритмы",level:2,title:"НОД и НОК",desc:"Алгоритм Евклида ищет наибольший общий делитель за пару шагов — ему больше 2000 лет.",learn:"алгоритм Евклида, while по остатку",code:String.raw`a = int(input('Первое число: '))
b = int(input('Второе число: '))
x, y = a, b
while y:
    x, y = y, x % y
print('НОД', a, 'и', b, '=', x)
print('НОК =', a * b // x)`},
{id:76,cat:"Алгоритмы",level:2,title:"Пузырьковая сортировка",desc:"Самая известная сортировка: соседние числа меняются местами, пока список не выстроится. Каждый шаг виден.",learn:"обмен значений, вложенные циклы",code:String.raw`import random

nums = [random.randint(1, 99) for _ in range(10)]
print('Было: ', nums)
for i in range(len(nums)):
    for j in range(len(nums) - 1 - i):
        if nums[j] > nums[j + 1]:
            nums[j], nums[j + 1] = nums[j + 1], nums[j]
    print('Шаг', i + 1, nums)
print('Стало:', nums)`},
{id:77,cat:"Алгоритмы",level:2,title:"Сортировка выбором",desc:"На каждом шаге находим самое маленькое число среди оставшихся и ставим его на место.",learn:"min с key, lambda, range от позиции",code:String.raw`import random

nums = [random.randint(1, 99) for _ in range(10)]
print('Было: ', nums)
for i in range(len(nums)):
    smallest = min(range(i, len(nums)), key=lambda k: nums[k])
    nums[i], nums[smallest] = nums[smallest], nums[i]
    print('Шаг', i + 1, nums)
print('Стало:', nums)`},
{id:78,cat:"Алгоритмы",level:2,title:"Бинарный поиск",desc:"Ищем число в отсортированном списке, каждый раз отрезая половину. Видно, как сужается поиск.",learn:"границы поиска, середина, while-else",code:String.raw`nums = sorted(range(0, 100, 3))
target = int(input('Ищем число: '))
low, high = 0, len(nums) - 1

while low <= high:
    mid = (low + high) // 2
    print('Смотрю позицию', mid, ':', nums[mid])
    if nums[mid] == target:
        print('Найдено на позиции', mid)
        break
    elif nums[mid] < target:
        low = mid + 1
    else:
        high = mid - 1
else:
    print('Такого числа нет в списке')`},
{id:79,cat:"Алгоритмы",level:2,title:"Перевод в двоичную",desc:"Переводит число в двоичную систему делением на 2, а потом проверяет себя встроенной функцией bin().",learn:"деление с остатком, сборка строки справа налево",code:String.raw`n = int(input('Число: '))
bits = ''
x = n
if x == 0:
    bits = '0'
while x > 0:
    bits = str(x % 2) + bits
    x //= 2
print(n, 'в двоичной:', bits)
print('Проверка функцией bin():', bin(n))`},
{id:80,cat:"Алгоритмы",level:2,title:"Римские цифры",desc:"Переводит обычные числа в римские: 2026 → MMXXVI. Жадный алгоритм: берём самый большой символ, который подходит.",learn:"таблица соответствий, жадный алгоритм",code:String.raw`table = [(1000, 'M'), (900, 'CM'), (500, 'D'), (400, 'CD'),
         (100, 'C'), (90, 'XC'), (50, 'L'), (40, 'XL'),
         (10, 'X'), (9, 'IX'), (5, 'V'), (4, 'IV'), (1, 'I')]

n = int(input('Число от 1 до 3999: '))
result = ''
for value, symbol in table:
    while n >= value:
        result += symbol
        n -= value
print('Римскими цифрами:', result)`},
{id:81,cat:"Алгоритмы",level:2,title:"Вычисление числа Пи",desc:"Ряд Лейбница: 4 − 4/3 + 4/5 − 4/7… Чем больше слагаемых, тем точнее приближение к π.",learn:"знакочередующийся ряд, накопление суммы",code:String.raw`n = int(input('Сколько слагаемых? (чем больше, тем точнее): '))
pi = 0
sign = 1
for i in range(n):
    pi += sign * 4 / (2 * i + 1)
    sign = -sign
print('Приближение π:', pi)

import math
print('Настоящее число π:', math.pi)`},
{id:82,cat:"Алгоритмы",level:3,title:"Треугольник Паскаля",desc:"Каждое число равно сумме двух над ним. Внутри треугольника прячутся биномиальные коэффициенты.",learn:"построение строки из предыдущей, center",code:String.raw`rows = int(input('Сколько строк? '))
row = [1]
for _ in range(rows):
    print(' '.join(map(str, row)).center(40))
    row = [1] + [row[i] + row[i + 1]
                 for i in range(len(row) - 1)] + [1]`},
{id:83,cat:"Алгоритмы",level:2,title:"Совершенные числа",desc:"Число совершенно, если равно сумме своих делителей: 6 = 1+2+3. Таких чисел очень мало.",learn:"списковое включение, sum, поиск делителей",code:String.raw`limit = int(input('Искать совершенные числа до: '))
for n in range(2, limit + 1):
    divs = [d for d in range(1, n) if n % d == 0]
    if sum(divs) == n:
        print(n, '— совершенное! Делители:', divs)`},
{id:84,cat:"Алгоритмы",level:2,title:"Числа Армстронга",desc:"153 = 1³ + 5³ + 3³ — число равно сумме кубов своих цифр. Найдём все такие трёхзначные.",learn:"разбор числа на цифры, степени",code:String.raw`for n in range(100, 1000):
    digits = [int(c) for c in str(n)]
    if sum(d ** 3 for d in digits) == n:
        print(n, '— число Армстронга')
print('Поиск завершён.')`},
{id:85,cat:"Алгоритмы",level:2,title:"Гипотеза Коллатца",desc:"Возьми любое число: чётное дели на 2, нечётное умножай на 3 и прибавляй 1. Всегда ли придёшь к единице?",learn:"цепочка преобразований, счётчик шагов",code:String.raw`n = int(input('Число: '))
steps = 0
while n != 1:
    print(n, end=' → ')
    if n % 2 == 0:
        n //= 2
    else:
        n = 3 * n + 1
    steps += 1
print(1)
print('Шагов понадобилось:', steps)`},
{id:86,cat:"Алгоритмы",level:1,title:"Счастливый билет",desc:"Трамвайный билет счастливый, если сумма первых трёх цифр равна сумме последних трёх.",learn:"срезы строк, сумма цифр",code:String.raw`while True:
    ticket = input('Номер билета (6 цифр, выход — стоп): ')
    if ticket == 'стоп':
        break
    if len(ticket) == 6 and ticket.isdigit():
        first = sum(int(c) for c in ticket[:3])
        last = sum(int(c) for c in ticket[3:])
        print('СЧАСТЛИВЫЙ!' if first == last else 'Обычный билет.')
    else:
        print('Нужно ровно 6 цифр.')`},
{id:87,cat:"Алгоритмы",level:1,title:"Степени двойки",desc:"Таблица степеней двойки — полезно помнить наизусть каждому программисту.",learn:"оператор **, форматированный вывод",code:String.raw`n = int(input('До какой степени? '))
for i in range(n + 1):
    print('2 ^', i, '=', 2 ** i)`},
{id:88,cat:"Алгоритмы",level:2,title:"Цифровой корень",desc:"Складывай цифры числа, пока не останется одна: 9875 → 29 → 11 → 2. Математический фокус.",learn:"while по условию, сумма цифр числа",code:String.raw`n = int(input('Число: '))
steps = 0
while n >= 10:
    n = sum(int(c) for c in str(n))
    steps += 1
    print('→', n)
print('Цифровой корень:', n, '(шагов:', steps, ')')`},
{id:89,cat:"Алгоритмы",level:3,title:"Треугольник Серпинского",desc:"Фрактал одной строчкой: битовая операция И между координатами рисует удивительный узор.",learn:"битовая операция &, фракталы",code:String.raw`size = 32
for y in range(size):
    line = ''
    for x in range(size):
        if x & y == 0:
            line += '*'
        else:
            line += ' '
    print(line)
print('Это фрактал — треугольник Серпинского!')`},
{id:90,cat:"Алгоритмы",level:2,title:"Случайное блуждание",desc:"Пьяница делает 20 шагов в случайные стороны. Прогоним прогулку 1000 раз и найдём рекорд удаления.",learn:"моделирование, статистика, max",code:String.raw`import random

walks = 1000
steps = 20
far = 0
for _ in range(walks):
    pos = 0
    for _ in range(steps):
        pos += random.choice([-1, 1])
    far = max(far, abs(pos))
print('После', walks, 'прогулок по', steps, 'шагов')
print('Максимальное удаление от старта:', far)`},
{id:91,cat:"Текст",level:1,title:"Счётчик гласных",desc:"Считает гласные в любом тексте и показывает статистику по каждой букве отдельно.",learn:"генератор sum, count для строк",code:String.raw`text = input('Текст: ').lower()
vowels = 'аеёиоуыэюя'
count = sum(1 for c in text if c in vowels)
print('Гласных букв:', count)
for v in vowels:
    if text.count(v):
        print(v, '—', text.count(v))`},
{id:92,cat:"Текст",level:1,title:"Всё наоборот",desc:"Переворачивает текст целиком и по словам. Заодно увидишь, чем отличаются два среза.",learn:"срез [::-1], split и join вместе",code:String.raw`text = input('Текст: ')
print('Задом наперёд:', text[::-1])
print('Слова в обратном порядке:', ' '.join(text.split()[::-1]))`},
{id:93,cat:"Текст",level:2,title:"Поросячья латынь",desc:"Тайный детский язык: первую букву слова — в конец и добавь «ай». «привет» → «риветпай».",learn:"функции, срезы слов, join по списку",code:String.raw`def pig(word):
    if not word:
        return word
    return word[1:] + word[0] + 'ай'

text = input('Фраза: ')
print(' '.join(pig(w) for w in text.split()))`},
{id:94,cat:"Текст",level:1,title:"Проверка анаграмм",desc:"Два слова — анаграммы, если состоят из одинаковых букв: «лиса» и «сила». Проверим сортировкой.",learn:"sorted для строк, сравнение списков",code:String.raw`a = input('Первое слово: ').lower()
b = input('Второе слово: ').lower()
if sorted(a) == sorted(b) and a != b:
    print('Это анаграммы!')
elif a == b:
    print('Это одно и то же слово :)')
else:
    print('Не анаграммы.')`},
{id:95,cat:"Текст",level:2,title:"Безумные истории",desc:"Введи слова не глядя на шаблон — получится абсурдная история. Игра жанра mad libs.",learn:"format, шаблоны строк, random.choice",code:String.raw`import random

templates = [
    '{adj} {noun} решил {verb} прямо на {place}!',
    'Вчера {adj} {noun} внезапно начал {verb} возле {place}.',
]
adj = input('Прилагательное: ')
noun = input('Существительное: ')
verb = input('Глагол (инфинитив): ')
place = input('Место: ')

story = random.choice(templates).format(adj=adj, noun=noun,
                                        verb=verb, place=place)
print()
print(story)`},
{id:96,cat:"Текст",level:1,title:"Цензор",desc:"Заменяет запрещённые слова на звёздочки той же длины. Список «плохих» слов легко пополнить.",learn:"replace, список замен, умножение строки",code:String.raw`banned = ['плохой', 'глупый', 'ужасный']
text = input('Текст: ')
for word in banned:
    text = text.replace(word, '*' * len(word))
print('После цензуры:', text)`},
{id:97,cat:"Текст",level:1,title:"Текст в рамке",desc:"Обводит любую надпись рамкой из звёздочек. Ширина рамки подстраивается под текст.",learn:"len для строк, повторение символов",code:String.raw`text = input('Текст: ')
width = len(text) + 4
print('*' * width)
print('* ' + text + ' *')
print('*' * width)`},
{id:98,cat:"Текст",level:1,title:"Генератор аббревиатур",desc:"«Средняя общеобразовательная школа» → СОШ. Берёт первую букву каждого слова.",learn:"индексация слов, upper, генератор",code:String.raw`text = input('Название из нескольких слов: ')
abbr = ''.join(w[0].upper() for w in text.split() if w)
print('Аббревиатура:', abbr)`},
{id:99,cat:"Текст",level:1,title:"Четыре регистра",desc:"Один текст — четыре вида: ЗАГЛАВНЫМИ, строчными, Как Заголовок и зЕрКаЛьНо.",learn:"upper, lower, title, swapcase",code:String.raw`text = input('Текст: ')
print('1 — ВСЕ ЗАГЛАВНЫЕ')
print('2 — все строчные')
print('3 — Каждое Слово С Большой')
print('4 — зЕРКАЛЬНЫЙ регистр')
choice = input('Выбери: ')
if choice == '1':
    print(text.upper())
elif choice == '2':
    print(text.lower())
elif choice == '3':
    print(text.title())
elif choice == '4':
    print(text.swapcase())`},
{id:100,cat:"Текст",level:3,title:"Подземелье — финальный босс",desc:"Мини-RPG на всё выученное: комнаты, монстры, зелья, сундуки и ловушки. Пройди все 5 комнат!",learn:"всё вместе: циклы, ветвления, случайность, состояние",code:String.raw`import random

name = input('Имя героя: ')
hp = 30
gold = 0
potions = 2

print('Привет,', name + '! Впереди 5 комнат подземелья.')
for room in range(1, 6):
    print('--- Комната', room)
    event = random.choice(['монстр', 'сундук', 'ловушка', 'фонтан'])
    if event == 'монстр':
        monster_hp = random.randint(8, 15)
        print('Монстр с', monster_hp, 'жизнями!')
        while monster_hp > 0 and hp > 0:
            cmd = input('удар / зелье (' + str(potions) + ' шт): ')
            if cmd == 'зелье' and potions > 0:
                potions -= 1
                hp = min(30, hp + 10)
                print('Вылечился! HP:', hp)
            else:
                hit = random.randint(3, 8)
                monster_hp -= hit
                print('Ты бьёшь на', hit)
                if monster_hp <= 0:
                    loot = random.randint(5, 15)
                    gold += loot
                    print('Победа! Найдено золото:', loot)
                else:
                    dmg = random.randint(2, 6)
                    hp -= dmg
                    print('Монстр отвечает на', dmg, '. HP:', hp)
    elif event == 'сундук':
        loot = random.randint(5, 20)
        gold += loot
        print('Сундук! Золото +', loot)
    elif event == 'ловушка':
        dmg = random.randint(1, 5)
        hp -= dmg
        print('Ловушка! HP -', dmg, '=', hp)
    else:
        potions += 1
        print('Волшебный фонтан: +1 зелье (всего', potions, ')')
    if hp <= 0:
        print('Герой пал в комнате', room, '... Золото:', gold)
        break
else:
    print('ПОБЕДА!', name, 'прошёл подземелье!')
    print('Золото:', gold, '| HP:', hp, '| Зелья:', potions)`},
];

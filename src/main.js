function PlayGame () {
  let name = prompt('Привет, как тебя зовут?')

  if (name == null) {
    return
  }
  while (name == '') {
    name = prompt('Привет, как тебя зовут?')
  }

  alert('Привет ' + name + ', меня зовут Савкимов Азиз, я сделал эту игру чтобы нам было немного весело, правила игры: я загадаю число а ты должен(а) отгадать это число от 1 до 10 000 с помощью подсказки "Мало" или "Много"! Тогда давай приступим!')

  let random = Math.ceil(Math.random() * 10000)

  console.log(random)

  let answer = prompt('Какое число я задал?')
  let guess = 0

  while (answer != random) {
    if (answer < random) {
      answer = prompt('Мало, попробуй еще раз!')
      guess++
    }
    if (answer > random) {
      answer = prompt('Много, попробуй еще раз!')
      guess++
    }
    if (answer == null) {
      alert(name + ' ты отменил игру!')
      return
    }
  }
  alert('Молодец! ' + name + ' ты угадал(a) за ' + guess + ' попыток!')

  let second = prompt('Ура...! Хочешь сыграть вторую часть? Да/Нет')

  if (second == 'Да' || second == 'да') {
    alert('Привет ещё раз, первая часть была только разогревом для тебя. На этот раз задание будет посложнее. Тебе нужно отгадать заданное мною число от 1 до 1 000 000. Начинаем, удачи!')

    let secondRandom = Math.ceil(Math.random() * 1000000)

    console.log(secondRandom)

    let secondAnswer = prompt('Какое число я задал?')
    let secondGuess = 0

    while (secondAnswer != secondRandom) {
      if (secondAnswer < secondRandom) {
        secondAnswer = prompt('Мало, попробуй еще раз!')
        secondGuess++
      }
      if (secondAnswer > secondRandom) {
        secondAnswer = prompt('Много, попробуй еще раз!')
        secondGuess++
      }
      if (secondAnswer == null) {
        alert(name + ' ты отменил игру!')
        return
      }
    }
    alert('Ты потрясающий человек ' + name + ' ! Ты угадал(a) за ' + secondGuess + ' попыток!')

    alert('Общим счетом ты угадал(а) за ' + guess + secondGuess + ' попыток!')
  }
}


// SOM DOS BOTÕES

document.querySelectorAll('.button-nav').forEach(function (button) {
	button.addEventListener('click', function () {
		var audio = document.getElementById('buttonSound')
		audio.play()
	})
})

// SWIPER

const swiper = new Swiper('.swiper', {
	// Optional parameters
	direction: 'horizontal',
	loop: true,

	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
	},
})

// ARCADE MACHINE

const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
const startButton = document.getElementById('startGameBtn')
const scoreBoard = document.getElementById('scoreBoard')
const qteSuccessSound = document.getElementById('qteSuccess')
const qteFailureSound = document.getElementById('qteFailure')
const gameOverSound = document.getElementById('gameOver')

let isGameActive = false
let score = 0
let currentButton = ''
let timer
const buttons = ['A', 'B', 'X', 'Y']

// inicia o jogo
startButton.addEventListener('click', startGame)

function startGame() {
	if (isGameActive) return
	isGameActive = true
	score = 0
	scoreBoard.textContent = `Score: ${score}`
	startRound()
}

// inicia uma nova rodada do QTE
function startRound() {
	clearCanvas()
	currentButton = generateRandomButton()
	drawButton(currentButton)
	timer = setTimeout(endGame, 3000)
}

// botão aleatório
function generateRandomButton() {
	const randomIndex = Math.floor(Math.random() * buttons.length)
	return buttons[randomIndex]
}

// desenha os botões com estilo do Dreamcast
function drawButton(button) {
	clearCanvas()

	// define estilo do botão
	ctx.font = '80px Arial'
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'

	// define cores dos botões
	let buttonColor
	switch (button) {
		case 'A':
			buttonColor = '#eb3c36'
			break
		case 'B':
			buttonColor = '#0078FF'
			break
		case 'X':
			buttonColor = '#ffd608'
			break
		case 'Y':
			buttonColor = '#74cca5'
			break
		default:
			buttonColor = '#FFFFFF'
	}

	// círculo para cada botão
	ctx.fillStyle = buttonColor
	ctx.beginPath()
	ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2)
	ctx.fill()

	// letra do botão
	ctx.fillStyle = '#FFFFFF'
	ctx.fillText(button, canvas.width / 2, canvas.height / 2)
}

// verifica a entrada do usuário
window.addEventListener('keydown', (event) => {
	if (!isGameActive) return

	const keyPressed = event.key.toUpperCase()
	if (keyPressed === currentButton) {
		clearTimeout(timer)
		score += 10
		scoreBoard.textContent = `Score: ${score}`
		startRound()
	}
})

// limpa o canvas
function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// termina o jogo se o tempo acabar
function endGame() {
	isGameActive = false
	clearCanvas()
	ctx.font = '40px Arial'
	ctx.fillStyle = 'red'
	ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2)
}

function checkDevice() {
	const mobileAlert = document.querySelector('.mobile-alert')
	const arcadeMachine = document.querySelector('.arcade-machine')

	if (window.innerWidth <= 768) {
		arcadeMachine.style.display = 'none'
		mobileAlert.style.display = 'block'
	} else {
		arcadeMachine.style.display = 'block'
		mobileAlert.style.display = 'none'
	}
}

// verifica a tela no carregamento
window.onload = checkDevice

// verifica a tela ao redimensionar
window.onresize = checkDevice

// COMENTÁRIOS DE USUÁRIOS

// efeito de digitação do comentário
function typeText(element, text, speed = 50) {
	let i = 0
	function typing() {
		if (i < text.length) {
			element.innerHTML += text.charAt(i)
			i++
			setTimeout(typing, speed)
		}
	}
	typing()
}

// inicia o efeito de digitação ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
	const testimonialMessages = document.querySelectorAll('.testimonial-message')

	testimonialMessages.forEach((message) => {
		const text = message.getAttribute('data-typed-text')
		message.innerHTML = ''
		typeText(message, text)
	})
})

// inicializa AOS.js
document.addEventListener('DOMContentLoaded', function () {
	AOS.init({
		duration: 1000,
		once: false,
	})
})

// ENVIO DE E-MAIL

document
	.getElementById('contactForm')
	.addEventListener('submit', function (event) {
		event.preventDefault()

		// dados do formulário
		const templateParams = {
			to_name: document.getElementById('name').value,
			to_email: document.getElementById('email').value,
			from_name: 'Shenmue Legacy',
		}

		// envia o email usando EmailJS
		emailjs.send('service_wgd8z21', 'template_ccgutue', templateParams).then(
			function (response) {
				console.log('SUCCESS!', response.status, response.text)
				alert('Formulário enviado com sucesso!')
				document.getElementById('contactForm').reset()
			},
			function (error) {
				console.log('FAILED...', error)
				alert('Falha no envio do formulário. Tente novamente.')
			}
		)
	})

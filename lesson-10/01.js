/*
  Цель задания: Разработать функционал для удаления фильма из списка с использованием паттерна MVC. После удаления фильма, необходимо отобразить сообщение "Фильм успешно удалён!" в message-box

  При возникновении сложностей можете ознакомиться с пошаговым планом реализации ниже, но лучше попробовать сначала самостоятельно 🧙‍♂️

*/

const model = {
    movies: [],
    addMovie(title, description) {
        const id = Math.random()
        const newMovie = {id, title, description}
        this.movies.push(newMovie)
        view.renderMovies(this.movies)
    },
    deleteMovie(movieID) {
        this.movies = this.movies.filter(movie => movie.id !== movieID)
        view.renderMovies(this.movies)
    }
}

const view = {
    init() {
        this.renderMovies(model.movies)

        const form = document.querySelector('.form')
        const inputTitle = document.querySelector('.input-title')
        const inputDescription = document.querySelector('.input-description')

        form.addEventListener('submit', function (event) {
            event.preventDefault()
            const title = inputTitle.value
            const description = inputDescription.value
            controller.addMovie(title, description)

            inputTitle.value = ''
            inputDescription.value = ''
        })

        const list = document.querySelector('.list')
        list.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-button')) {
                const movieID = +e.target.parentElement.id
                controller.deleteMovie(movieID)
            }
        })
    },
    renderMovies(movies) {
        const list = document.querySelector('.list')
        let moviesHTML = ''

        for (const movie of movies) {
            moviesHTML += `
        <li id="${movie.id}" class="movie">
          <b class="movie-title">${movie.title}</b>
          <p class="movie-description">${movie.description}</p>
          <button class="delete-button" type="button">Удалить 🗑</button>
        </li>
      `
        }

        list.innerHTML = moviesHTML
    },
    displayMessage(message, isError = false) {
        const messageBox = document.querySelector('.message-box')
        messageBox.textContent = message
        if (isError) {
            messageBox.classList.remove('success')
            messageBox.classList.add('error')
        } else {
            messageBox.classList.remove('error')
            messageBox.classList.add('success')
        }
    },
}

const controller = {
    addMovie(title, description) {
        if (title.trim() !== '' && description.trim() !== '') {
            model.addMovie(title, description)
            view.displayMessage('Фильм добавлен успешно!')
        } else {
            view.displayMessage('Заполните все поля!', true)
        }
    },
    deleteMovie(movieID) {
        model.deleteMovie(movieID)
        view.displayMessage("Фильм успешно удален!")
    }
}

function init() {
    view.init()
}

document.addEventListener('DOMContentLoaded', init)

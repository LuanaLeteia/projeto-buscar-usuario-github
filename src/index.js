document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if (userName.length === 0) {
        alert('Por favor, insira um nome de usuário do GitHub')
        return
    }

    getUserProfile(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value.trim()

    if (e.key !== 'Enter') return

    if (userName.length === 0) {
        alert('Por favor, insira um nome de usuário do GitHub')
        return
    }

    getUserProfile(userName)
})

async function user(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}`)

    if (!response.ok) {
        throw new Error('Usuário não encontrado')
    }

    return await response.json()
}

async function repos(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}/repos?per_page=10`)
    return await response.json()
}

function getUserProfile(userName) {
    user(userName).then(userData => {
        let userInfo = `<div class="info">
                            <img src="${userData.avatar_url}" alt="Foto do Perfil"/>
                            <div class="data">
                               <h1>${userData.name ?? 'Não possui nome cadastrado 😒'}</h1>
                               <p>${userData.bio ?? 'Não possui bio cadastrada 🙄'}</p>
                            </div>
                        </div>`

        document.querySelector('.profile-data').innerHTML = userInfo

        getUserRepositories(userName)
    })

        .catch(() => {
            document.querySelector('.profile-data').innerHTML =
                `<p class="error">Usuário não encontrado! 😕</p>`
        })
}

function getUserRepositories(userName) {
    repos(userName).then(reposData => {
        let repositoriesItens = ""
        reposData.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
        })

        document.querySelector('.profile-data').innerHTML += `<div class="repositories section">
                                                                 <h2>Repositórios</h2>
                                                                 <ul>${repositoriesItens}</ul>
                                                               </div>`
    })
}

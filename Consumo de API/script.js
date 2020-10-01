// NAS ROTAR POST PUT E DELETE O AXIOSCONFIG VAI SEMPRE DEPOIS DA URL.
var axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('Token')}`
    }
  }
  function login() {
    let emailFiels = document.getElementById('email');
    let passwordFiels = document.getElementById('password');

    let email = emailFiels.value
    let password = passwordFiels.value;

    axios.post('http://localhost:8080/auth', { email, password })
      .then(res => {
        localStorage.setItem('Token', res.data.token)
        document.location.reload(true);
      }).catch(err => {
        console.log(err);
      })
  }

  function main() {
    axios
      .get('http://localhost:8080/games',axiosConfig)
      .then((response) => {
        let games = response.data;
        let lista = document.getElementById('games');
        games.forEach((game) => {
          let item = document.createElement('li');
          // Adiciona campos customizados pra lista
          item.setAttribute('data-id', game.id);
          item.setAttribute('data-title', game.title);
          item.setAttribute('data-year', game.year);
          item.setAttribute('data-price', game.price);
          // --
          item.innerHTML = `${game.id} - ${game.title} - R$ ${game.price}`;
          let deleteBtn = document.createElement('button');
          deleteBtn.innerHTML = 'Deletar';
          deleteBtn.addEventListener('click', () => {
            deleteGame(item);
          });
          let editBtn = document.createElement('button');
          editBtn.innerHTML = 'Editar';
          editBtn.addEventListener('click', () => {
            loadForm(item);
          });
          //   deleteBtn.setAttribute("class", "btn btn-danger");
          item.appendChild(deleteBtn);
          item.appendChild(editBtn);
          lista.appendChild(item);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  main();

  function cadastro() {
    let titleInput = document.getElementById('title');
    let yearInput = document.getElementById('year');
    let priceInput = document.getElementById('price');

    let game = {
      title: titleInput.value,
      year: yearInput.value,
      price: priceInput.value,
    };

    axios
      .post('http://localhost:8080/games', game, axiosConfig)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteGame(listItem) {
    let id = listItem.getAttribute('data-id');
    axios
      .delete(`http://localhost:8080/games/${id}`,axiosConfig)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function loadForm(listItem) {
    let id = listItem.getAttribute('data-id');
    let title = listItem.getAttribute("data-title");
    let year = listItem.getAttribute("data-year");
    let price = listItem.getAttribute("data-price");
    // pegando os inputs
    let idField = document.getElementById("idEdit");
    let titelField = document.getElementById("titleEdit");
    let yearField = document.getElementById("yearEdit");
    let prieField = document.getElementById("priceEdit");
    // atribuindo valor aos inputs
    idField.value = id;
    titelField.value = title;
    yearField.value = year;
    prieField.value = price;
  }

  function atualizar() {
    let idField = document.getElementById("idEdit").value;
    let titelField = document.getElementById("titleEdit").value;
    let yearField = document.getElementById("yearEdit").value;
    let prieField = document.getElementById("priceEdit").value;

    let game = {
      title: titelField,
      year: yearField,
      price: prieField
    }
    axios.put(`http://localhost:8080/games/${idField}`, game, axiosConfig).then(() => {
      window.location.reload();
    }).catch(err => console.log(err))
  }

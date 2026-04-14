let userDiv = document.getElementById("user-list-container");
let button = document.getElementById("load-more-btn");

const API_URL = "https://dummyjson.com/users";

async function loadUsers() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    userDiv.innerHTML = `
                                    `;
    userDiv.innerHTML += data.users.map(
      (x) => `
        
                <div class="user-card">
                <table>
                                
                                <thead>
                                    <th>ID</th>
                                    <th>Profilepic</th>
                                    <th>Complete Name</th>
                                    <th>Age</th>
                                    <th>Username</th>
                                    <th>Height</th>
                                </thhead>
                                <tbody>
                    <td>${x.id}</td>
                    <td><img class="user-card-image" src="${x.image}"/></td>
                    <td>${x.firstName} ${x.lastName} ${x.maidenName}</td>
                    <td>${x.age}</td>
                    <td>${x.username}</td>
                    <td>${x.height}</td>
                
                </tbody></table>
                </div>`,
    ).join('');
    userDiv.innerHTML += "";
  } catch (error) {
    userDiv.innerHTML = `<div class=user-card">
                            <p>Error: ", ${error}</p>
                        </div>`;
  }
}

button.addEventListener("click", loadUsers);

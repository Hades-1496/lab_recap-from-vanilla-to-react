import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './index.css'

export default function App() {
  // Declaración de variables.
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [error, setError] = useState(null);

  // Recogida de datos de usuarios.
  const fetchUsers = async (currentSkip) => { 
  try {
    setLoading(true);
    const response = await fetch("https://dummyjson.com/users?limit=10&skip="+currentSkip); // Recomendación de la IA para limitar la cantidad de usuarios: ?limit=10&skip="+skip
    const data = await response.json();
    setUsers(data.users);
    if (currentSkip === 0) {
      setUsers(data.users);
    }
    else {
      setUsers(prevUsers => [...prevUsers, ...data.users]);
    }
    setLoading(false);
  }
  
  catch (error) {
    console.error("Error cargando usuarios: ", error);
    setError(error.message); // Para que aparezca el error en el DOM.
    setLoading(false);
  }

  useEffect(() => {fetchUsers(skip)},[]); // Sólo Dios (y la IA, que me lo acaba de eusersplicar) sabe qué hace esto.

  
}
// Cargar más usuarios.
  const moreUsers = ()=>{
    if (skip < 30)
    {
      const newserstSkip = skip +10;
      fetchUsers(newserstSkip);
      setSkip(newserstSkip); // Esto me pone muy nervioso.
    }
  }

return (
  <div>
<h1>Lista de Usuarios</h1>
  <div id="user-list-container">
    
    {/* Errores */}
    {error && (
      <div className ="user-card">
        <p>Error: {error}</p>
      </div>
    )}

    {/* Cartas de usuarios */}
    {users.map((user) => (
      <div class="user-card">
                <table>
                                
                                <thead>
                                    <th>ID</th>
                                    <th>Profilepic</th>
                                    <th>Complete Name</th>
                                    <th>Age</th>
                                    <th>Username</th>
                                    <th>Height</th>
                                </thead>
                                <tbody>
                    <td>{user.id}</td>
                    <td><img class="user-card-image" src={user.image}/></td>
                    <td>{user.firstName} {user.lastName} {user.maidenName}</td>
                    <td>{user.age}</td>
                    <td>{user.username}</td>
                    <td>{user.height}</td>
                
                </tbody></table>
                </div>
    ))}
    
      
  </div>
  {/* Cargando */}

      {loading && <p>Cargando usuarios...</p>}
      {/* En vez de usar un igual o lo que sea, se debe usar el && para que se ejecute la etiqueta. */}
      {/* Para cargar más usuarios */}
      {!loading && (skip < 30) && (
        <button id="load-more-btn" onClick={moreUsers}>
          Cargar más.
        </button>
      )}
      {!loading && (skip > 30) && (
        <button id="disabled">
          Cargar más.
        </button>
      )}
  </div>
  
)
}


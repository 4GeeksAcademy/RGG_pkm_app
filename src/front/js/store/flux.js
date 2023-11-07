const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		message: null,
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white"
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white"
		  }
		],
		favourites: [],
		auth: null // Campo de autenticación
	  },
	  actions: {
	
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
		getMessage: async () => {
		  try {
			const resp = await fetch(process.env.BACKEND_URL + "api/login", {
			  method: "GET",
			});
			const data = await resp.json();
			setStore({ message: data.message });
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
		changeColor: (index, color) => {
		  const store = getStore();
		  const demo = store.demo.map((elm, i) => {
			if (i === index) elm.background = color;
			return elm;
		  });
		  setStore({ demo: demo });
		},
		getAuthentication: () => {
		  const store = getStore();
		  return store.auth;
		},
		setAuthentication: (value) => {
		  // Actualiza el estado de autenticación en el contexto
		  getStore().auth = value;
		},
		login: async (email, password) => {
		  try {
			const response = await fetch(process.env.BACKEND_URL + "api/login", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({ email: email, password: password }),
			});
  
			const data = await response.json();
			console.log("Respuesta del backend:", data);
  
			sessionStorage.setItem("token", data.token);
  
			if (response.status === 200) {
			  setStore({ auth: true, user: data.user });
			  return true;
			} else {
			  setStore({ auth: false });
			  return false;
			}
		  } catch (error) {
			console.error("Error al iniciar sesión:", error);
			setStore({ auth: false });
			return false;
		  }
		},
		addFavorite: async (pokemonId) => {
			const store = getStore();
			const token = sessionStorage.getItem("token");
	
			if (!token) {
			  console.error("Usuario no autenticado");
			  return;
			}
	
			try {
			  const response = await fetch(process.env.BACKEND_URL + "api/add_favorite", {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				  Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ pokemon_id: pokemonId }),
			  });
	
			  if (response.status === 200) {
				// Si la solicitud se completa con éxito, actualiza la lista de favoritos en el estado
				const favoriteList = [...store.favorites, pokemonId];
				setStore({ favorites: favoriteList });
			  } else {
				console.error("Error al agregar a favoritos");
			  }
			} catch (error) {
			  console.error("Error al agregar a favoritos:", error);
			}
		  }
		}
	  };
	};

  export default getState;
  
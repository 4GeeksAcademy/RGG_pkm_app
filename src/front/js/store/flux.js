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
		favourites:[],
		auth: null // Campo de autenticación
	  },
	  actions: {
		setFavourite: (img) =>{

				const store = getStore();	
				console.log([...store.favourites, img]);
				setStore({ favourites: [...store.favourites, img] });
		  },
		  DelFavourite: (img) => {
			const store = getStore();
			const updatedFavorites = store.favourites.filter(favorite => favorite !== img);
			setStore({ favourites: updatedFavorites });
		  },  
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
		
		getMessage: async () => {
		  try {
			const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
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
  
		login: async (email, password) => {
			console.log(email, password)
		  try {
			const response = await fetch(process.env.BACKEND_URL + "api/login", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
				// "Authorization": "Bearer " + sessionStorage.getItem("token"),
			  },
			  body: JSON.stringify({ email: email, password: password }),
			
			});
			const data = await response.json()
			sessionStorage.setItem("token",data.token) 
			if (response.status === 200) {
			  setStore({ auth: true, user:data.user });
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
		}
	  }
	};
  };

  export default getState;
  
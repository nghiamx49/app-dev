const AuthService = {
  login: async (user) => {
    try {
      let response = await fetch(
        "http://tam-application/api/auth/login",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      if (response.status !== 401) {
        let data = await response.json();
        return data;
      } else {
        return { isAuthenticated: false, user: { user: "", role: "" } };
      }
    } catch (error) {
      console.log("error");
    }
  },
  logout: async () => {
    try {
      let response = await fetch(
        "http://tam-application/api/auth/logout",
        {
          credentials: "include",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  isAuthenticated: async () => {
    try {
      let response = await fetch(
        "http://tam-application/api/auth/authenticated",
        {
          credentials: "include",
        }
      );
      if (response.status !== 401) {
        let data = await response.json();
        return data;
      } else {
        return { isAuthenticated: false, user: { user: "", role: "" } };
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default AuthService;

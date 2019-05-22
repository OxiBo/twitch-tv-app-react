// import axios from "axios";

const baseURL = "https://wind-bow.glitch.me/twitch-api/";

const userInfo = async (user = "cretetion") => {
  let info = { name: "", urlStream: "", icon: "", status: "" };
  try {
    //   api call with axios, if using axios, in if blocks need to change "response[n]" to 'response[n].data'
    // const response = await Promise.all([
    //   axios.get(`${baseURL}users/${encodeURIComponent(user)}?callback`),
    //   axios.get(`${baseURL}streams/${encodeURIComponent(user)}?callback`)
    // ]);

    /*  I use fetch because axios will  catch an error if the user does not exist or offline (unavailable) and the error will not be informative enough.  
read more - https://medium.com/@sahilkkrazy/fetch-vs-axios-http-request-c9afa43f804e */

    const response = await Promise.all([
      fetch(`${baseURL}users/${encodeURIComponent(user)}?callback`, {
        cache: "reload"
      }).then(res => res.json()),
      fetch(`${baseURL}streams/${encodeURIComponent(user)}?callback`, {
        cache: "reload"
      }).then(res => res.json())
    ]);

    // const response = await Promise.all([
    //     fetch(`${baseURL}users/${encodeURIComponent(user)}?callback`, { cache: "reload" })
    //     .then(response => {
    //         if(!response.ok) {
    //             console.log(response.ok)
    //             throw Error(response.statusText);
    //         }
    //         return response.json();
    //     }),
    //     fetch(`${baseURL}streams/${encodeURIComponent(user)}?callback`,{ cache: "reload" }).then(response => {
    //         if(!response.ok) {
    //             console.log(response.ok)
    //             throw Error(response.statusText);
    //         }
    //         return response.json();
    //     })
    // ])

    if (response[0].status >= 404 && response[0].status <= 422) {
      info = {
        name: user,
        urlStream: "https://www.twitch.tv/",
        icon: "face-sad.png",
        status: "User does not exist or unavailable",
        stream: ""
      };
    } else {
      info = {
        name: response[0].display_name,
        urlStream: `https://www.twitch.tv/${response[0].name}`,
        icon: response[0].logo
      };

      if (response[1].stream === null) {
        info.status = ""; // ?????
        info.stream = "";
      } else {
        info.status = response[0].status;
        info.stream = `${response[1].stream.channel.game}: ${
          response[1].stream.channel.status
        }`;
      }
    }
  } catch (error) {
    // log error message
    console.error(error);
    console.log("unable to get information from API");

    info = {
      name: user,
      error: "failed to load information"
    };
  }

  //   console.log(info);
  return info;
};

export default userInfo;

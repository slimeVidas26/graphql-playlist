const dbuser = 'isaac';
 const dbpassword = 'trottinette';


  module.exports = {
    mongoURI: `mongodb+srv://${dbuser}:${dbpassword}@cluster0-3or9x.mongodb.net/graphql-playlist-db?retryWrites=true&w=majority`,
    secretOrKey: "secret"
  };
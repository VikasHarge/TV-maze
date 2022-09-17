import './App.css';
import MovieHome from './components/MovieHome';

const p = {
  name : " vikas ",
  age : 24
}


function App() {

const date = new Date().toDateString();


  return (
    <div>
      <MovieHome />
    </div>
  );
}

export default App;

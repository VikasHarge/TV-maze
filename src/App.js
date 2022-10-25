import './App.css';
import MovieHome from './components/MovieHome';


function App() {

const date = new Date().toDateString();


  return (
    <div>
      <MovieHome />
    </div>
  );
}

export default App;

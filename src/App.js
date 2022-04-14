import './App.css'
import Data from './components/DataFeed/DataFeed'
import HomePage from './layouts/HomePage/HomePage'

function App() {
	return (
		<div className='App'>
			<header>
				<div style={{ margin: '3rem auto' }}>Vinted task</div>
			</header>
			<HomePage />
		</div>
	)
}

export default App

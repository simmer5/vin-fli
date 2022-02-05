import './App.css'
import Data from './components/DataFeed/DataFeed'
import HomePage from './layouts/HomePage/HomePage'

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<div>Vinted task</div>
				<div>
					{/* <Data /> */}
					<HomePage />
				</div>
			</header>
		</div>
	)
}

export default App

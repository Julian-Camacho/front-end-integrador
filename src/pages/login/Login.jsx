import './Login.css'
 
export default function Login(){

    return (
		<div className="login-container">
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="wave"></div>
			<form className="login-form" /* onSubmit={handleSubmit} */>
				<h1>Ingresar</h1>
				<label>Correo electrónico</label>
				<input
					name="email"
					required
					type="text"
					placeholder="Correo electrónico"
				/>

				<label>Contraseña</label>
				<input
					name="password"
					required
					type="password"
					placeholder="Contraseña"
				/>

				<button type="submit" className="button">
					Ingresar
				</button>
			</form>
		</div>
	);
}
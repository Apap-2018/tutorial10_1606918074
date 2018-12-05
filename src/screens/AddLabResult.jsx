import React from 'react';
import { Loading } from '../components/Loading';
import { FormAddLabResult } from '../containers/FormAddLabResult';
import { Appointment } from '../utils/Appointment';

export class AddLabResult extends React.Component {
	constructor(props) {
		super(props)
		handleFormSubmit(e) {
		e.preventDefault()
		this.setState({
			loading:true
		})

		const data = new FormData(e.target)
		const dataJson = {}

		data.forEach((val, key) => {
			if (val !== "") {
			let name = key.split('.');
			if (name.length > 1){
				let last = name.pop()
				name.reduce((prev, next) => {
					return prev[next] = prev[next] || {};
				}, dataJson)[last] = val
			} else{
				dataJson[key] = val
			}
			}
		})

		Appointment.addLabResult(dataJson).then(response => {
			if (response.status === 200){
				this.setState({
					loading: false,
					labResult: response.result
				})
				alert(`Sukses update pasien ${this.state.pasien.nama}`)
			}else{
			this.setState({
				loading: false,
				pasien: response.result
			})
			alert(`Gagal update pasien ${this.state.labResult.pasien.nama}`)
			}
		})
	}

	render() {
		if (this.state.loading) {
			return (
				<Loading msg="Fetching Data..." />
			)
		} else {
			return (
				<FormAddLabResult pasien={this.state.labResult.pasien} onSubmit={this.handleFormSubmit} />
			)
		}
	}
}
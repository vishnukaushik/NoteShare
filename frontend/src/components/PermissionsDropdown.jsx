import React, { useState } from "react";
import "../styles/PermissionDropdown.css";

const PermissionSelector = ({ accessLevel, setAccessLevel }) => {
	const handleChange = (e) => {
		const value = e.target.value;
		setAccessLevel(value);
	};

	return (
		<div className="permission-container">
			<label
				className="permission-label text-sm text-gray-500"
				htmlFor="permission-select"
			>
				Access Level
			</label>
			<div className="select-wrapper">
				<select
					id="permission-select"
					className="permission-select"
					value={accessLevel}
					onChange={handleChange}
				>
					<option value="view">View</option>
					<option value="edit">Edit</option>
				</select>
				<div className="select-arrow" />
			</div>
		</div>
	);
};

export default PermissionSelector;

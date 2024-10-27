import React from 'react';
import { FaBuilding, FaDollarSign, FaUsers, FaRegStar } from 'react-icons/fa';
import './pathStyles/PathBenefits.css';

const PathBenefits = ({ pathData }) => {
    const { benefits, pathHeader } = pathData;

    return (
        <div className="path-benefits-container">
            <h2 className="path-benefits-heading">{`Why Join ${pathHeader.title} ?`}</h2>
            <div className="benefits-list">
                <div className="benefit-item">
                    <FaUsers className="benefit-icon" />
                    <p className="benefit-text">{benefits[0].social_status}</p>
                </div>
                <div className="benefit-item">
                    <FaBuilding className="benefit-icon" />
                    <p className="benefit-text">Companies Hiring from this Path:</p>
                    <ul className="companies-list">
                        {benefits[0].companies_hiring.split(',').map((company, index) => (
                            <li key={index}>{company.trim()}</li>
                        ))}
                    </ul>
                </div>
                <div className="benefit-item">
                    <FaDollarSign className="benefit-icon" />
                    <p className="benefit-text">Salary Statistics (US):</p>
                    <ul className="salary-list">
                        <li>Median Salary: {benefits[0].salary_statistics_median}</li>
                        <li>Entry Level Salary: {benefits[0].salary_statistics_entry_level}</li>
                        <li>Experienced Level Salary: {benefits[0].salary_statistics_experienced_level}</li>
                    </ul>
                </div>
            </div>
            {/* <div className="path-reputation">
                <FaRegStar className="star-icon" />
                <p className="reputation-text">Web development offers excellent career prospects, high salaries, and the opportunity to work with leading tech companies.</p>
            </div> */}
        </div>
    );
};

export default PathBenefits;

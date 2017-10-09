import React from 'react'
import { staticResource } from 'utils'

const About = () => (
    <div>
        <h4 className="title is-4">Planting Healthy Forests</h4>
        <img src={staticResource('images/hands.jpg')} className="about-hands" />
        <p className="about-text">
            The Seedlot Selection Tool (SST) is a GIS mapping program designed to help forest managers match seedlots
            with planting sites based on climatic information. The climates of the planting sites can be chosen to
            represent current climates, or future climates based on selected climate change scenarios.
        </p>
        <div>&nbsp;</div>
        <div>
            <div className="about-step">
                <img src={staticResource('images/about_objective.gif')} />
                <h4 className="title is-4">1. Select Objective</h4>
                <p>
                    You can find seedlots for your planting site or planting sites for your seedlot
                </p>
            </div>
            <div className="about-step">
                <img src={staticResource('images/about_location.gif')} />
                <h4 className="title is-4">2. Select Location</h4>
                <p>
                    You can click on the map or enter coordinates to locate your seedlot or planting site
                </p>
            </div>
            <div className="about-step">
                <img src={staticResource('images/about_region.gif')} />
                <h4 className="title is-4">3. Select Region</h4>
                <p>
                    You can select the geographic region closest to your site or choose from a list of available regions
                </p>
            </div>
            <div className="about-step">
                <img src={staticResource('images/about_climate.gif')} />
                <h4 className="title is-4">4. Select Climate Scenarios</h4>
                <p>
                    You can select historical, current, or future climates for your seedlots of planting sites
                </p>
            </div>
            <div className="about-step">
                <img src={staticResource('images/about_method.gif')} />
                <h4 className="title is-4">5. Select Transfer Limit Method</h4>
                <p>
                    You can enter your own custom limit or use an existing zone to calculate a transfer limit
                </p>
            </div>
            <div className="about-step">
                <img src={staticResource('images/about_variables.gif')} />
                <h4 className="title is-4">6. Select Climate Variables</h4>
                <p>
                    You can use a variety of climate variables to match your seedlot and planting site
                </p>
            </div>
            <div className="about-step">
                <img src={staticResource('images/about_map.gif')} />
                <h4 className="title is-4">7. Map your Results</h4>
                <p>
                    The map shows where to find appropriate seedlots or planting sites
                </p>
            </div>
        </div>
    </div>
)

export default About
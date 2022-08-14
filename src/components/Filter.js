import React from "react";
import './Filter.scss';

export default function Filter(props) {

    return (
        <div className="filter">
            <p>Filter by</p>
            <ul>
                <li data-generation='1'>
                    Generation 1
                </li>
                <li data-generation='2'>
                    Generation 2
                </li>
                <li data-generation='3'>
                    Generation 3
                </li>
                <li data-generation='4'>
                    Generation 4
                </li>
                <li data-generation='5'>
                    Generation 5
                </li>
                <li data-generation='6'>
                    Generation 6
                </li>
                <li data-generation='7'>
                    Generation 7
                </li>
                <li data-generation='8'>
                    Generation 8
                </li>
                <li data-generation='9'>
                    Generation 9
                </li>
            </ul>
        </div>
    );

}
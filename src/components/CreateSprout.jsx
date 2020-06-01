import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import SproutDefinition from "./SproutDefinition";
import SproutList from "./SproutsList";
import * as handleDates from "./HandleDates";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/fr';

function CreateSprout(props) {

    const [sprout, setSprout] = useState(SproutList[0]);
    const [displayAllInformation, setDisplayAllInformation] = useState(false);

    function reduce() {
        setDisplayAllInformation(false);
    }

    function expand() {
        setDisplayAllInformation(true);
    }

    function handleSproutModification(field, data) {
        setSprout(prevState => {
            return {...prevState, [field]: data};
        });
    }

    function handleStartDate(day, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput().value;
        const inputDate = handleDates.getDateFromFormattedString(input, handleDates.FR_FORMAT, 'fr');
        const endDate = handleDates.getDateFromFormattedString(sprout.endDate, handleDates.FR_FORMAT, 'fr');
        handleSproutModification("startDate", input);
        handleSproutModification("numberOfDays", handleDates.getNbrDaysBetween(inputDate, endDate));
    }

    function handleEndDate(day, modifiers, dayPickerInput) {
        const input = dayPickerInput.getInput().value;
        const inputDate = handleDates.getDateFromFormattedString(input, handleDates.FR_FORMAT, 'fr');
        const startDate = handleDates.getDateFromFormattedString(sprout.startDate, handleDates.FR_FORMAT, 'fr');
        if (startDate > inputDate) {
            handleSproutModification("endDate", startDate);
            handleSproutModification("numberOfDays", 0);
        } else {
            handleSproutModification("endDate", input);
            handleSproutModification("numberOfDays", handleDates.getNbrDaysBetween(startDate, inputDate));
        }
    }

    function changeSeedType(event) {
        let seedTypeValue = event.target.value;
        if (typeof seedTypeValue === "string" && !isNaN(seedTypeValue) && Number(seedTypeValue) >= 1) {
            const initSeedType = Number(seedTypeValue);
            const initSeedName = SproutList[initSeedType].seedName;
            const initRemarks = SproutList[initSeedType].remarks;
            const initNbrDays = SproutList[initSeedType].numberOfDays;
            const initStartDate = new Date();
            const initEndDate = handleDates.getNewDateByAddingNbrDays(initStartDate, initNbrDays);
            const imageSrc = SproutList[initSeedType].imageSrc;

            setSprout(new SproutDefinition(initSeedType,
                initSeedName,
                handleDates.getFormattedStringFromDate(initStartDate, handleDates.FR_FORMAT),
                handleDates.getFormattedStringFromDate(initEndDate, handleDates.FR_FORMAT),
                initNbrDays,
                initRemarks,
                imageSrc));
            expand();
        } else {
            setSprout(SproutList[0]);
            reduce();
        }
    }

    function handleAddClick(event) {
        event.preventDefault();
        props.onAdd(sprout);
        setSprout(SproutList[0]);
        reduce();
    }

    function handleRangeChange(event) {
        let range = event.target.value;
        handleSproutModification("numberOfDays", range);

        const startDateValue = new Date(handleDates.getDateFromFormattedString(sprout.startDate, handleDates.FR_FORMAT, 'fr'));
        const endDateValue = handleDates.getNewDateByAddingNbrDays(startDateValue, range);
        handleSproutModification("endDate", handleDates.getFormattedStringFromDate(endDateValue, handleDates.FR_FORMAT));
    }

    function eraseRemarks(event) {
        event.preventDefault();
        handleSproutModification("remarks", "");
        document.getElementById('remarks').focus();
    }

    function handleRemarks(event) {
        let remarks = event.target.value;
        handleSproutModification("remarks", remarks);
    }

    return (
        <div className="container addComponent">
            <h1 className={"section-title"}>Add new sprout</h1>
            <form className="needs-validation spout-create-form">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Seed type</label>
                    </div>
                    <select required onChange={changeSeedType} value={sprout.seedType} className="custom-select"
                            id="inputGroupSelect01">
                        {SproutList.map((sproutItem, index) => {
                            return (
                                <option key={index} value={sproutItem.seedType}>{sproutItem.seedName}</option>
                            );
                        })}
                    </select>
                </div>

                {displayAllInformation &&
                <div className="form-row">
                    <div className="col-lg-1 col-md-1 col-sm-12 centered">
                        <label htmlFor="startDateId">Start&nbsp;date</label>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 centered container">
                        <DayPickerInput className="date" required={true} placeholder="dd/mm/yyyy"
                                        id="startDateId"
                                        value={sprout.startDate}
                                        onDayChange={handleStartDate}
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        dayPickerProps={{
                                            locale: 'fr',
                                            localeUtils: MomentLocaleUtils,
                                            todayButton: 'Today'
                                        }}
                        />
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-12">
                        <label htmlFor="endDateId">End&nbsp;date</label>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 container">
                        <DayPickerInput className="date" placeholder="dd/mm/yyyy"
                                        id="endDateId"
                                        value={sprout.endDate}
                                        onDayChange={handleEndDate}
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        dayPickerProps={{
                                            locale: 'fr',
                                            localeUtils: MomentLocaleUtils,
                                            todayButton: 'Today'
                                        }}
                        />

                    </div>

                    <div className="col-lg-3 space">
                        <input type="range" onChange={handleRangeChange} value={sprout.numberOfDays} min="0" max="15"
                               className="form-control-range" id="formControlRange"/>
                    </div>
                    <div className="col-lg-1 space">
                        <input type="text" className="form-control" id="textInput" value={sprout.numberOfDays + " days"}
                               disabled={true}/>
                    </div>
                    <div className="col-lg-12 space">
                        <textarea className="form-control editableTexArea"
                                  id="remarks"
                                  name="remarks"
                                  value={sprout.remarks}
                                  rows="3"
                                  onChange={handleRemarks}
                                  placeholder="Insert a note..."
                        />
                        <Zoom in={sprout.remarks.length !== 0} className="eraseRemarks" onClick={eraseRemarks}>
                            <button className="eraseRemarks" onClick={eraseRemarks}>
                                <span className="fas fa-eraser"/>
                            </button>
                        </Zoom>
                    </div>
                </div>
                }

                <Zoom in={displayAllInformation} className="addButton roundButton">
                    <Fab onClick={handleAddClick} color="primary" aria-label="add">
                        <AddIcon/></Fab>
                </Zoom>

                {/*<div className="form-group">*/}
                {/*    {JSON.stringify(sprout)}*/}
                {/*</div>*/}
            </form>
        </div>);
}

export default CreateSprout;
import React, {useState} from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import * as handleDates from "./HandleDates";
import DeleteIcon from '@material-ui/icons/Delete';


function Sprout(props) {

    const [progress, setProgress] = useState(calculateProgression());
    const [textNumberLines, setTextNumberLines] = useState(3);
    const [reduced, setReduced] = useState(props.reduced);

    setInterval(() => setProgress(calculateProgression()), 1000 * 60 * 60);

    function getCurrentDayNumber() {
        const today = handleDates.getTodayDateWellFormatted('fr');
        const startDate = handleDates.getDateFromFormattedString(props.object.startDate, handleDates.FR_FORMAT, 'fr');
        return handleDates.getNbrDaysBetween(startDate, today);
    }

    function calculateProgression() {
        return getCurrentDayNumber() * 100 / props.object.numberOfDays;
    }

    function toggleTextArea() {
        setReduced(reduced !== true);
    }

    function handleDeleteClick(event) {
        event.preventDefault();
        props.onDelete(props.id);
    }

    return <div className="sprout container"
                onDoubleClick={toggleTextArea} data-toggle="tooltip" data-placement="top"
                title="Double click to expand / reduce">
        {reduced === false &&<img alt="" className="roundSproutImage" src={"img/"+props.object.imageSrc}/>}
        <div className="form-row">
            <div className={reduced ? "col-lg-1 col-md-4 col-sm-4" : "col-lg-1"}>
                <h1>{props.object.seedName}</h1>
            </div>
            {reduced === false &&
            <div className="col-lg-11">
                <span
                    className={progress === 100 ? "tag badge badge-success" : progress > 100 ? "tag badge badge-danger" : "tag badge badge-warning"}>
                    {progress === 100 ? "Time to harvest" : progress > 100 ? "Overdue" : "In progress"}
                </span>
            </div>
            }
            <div className={reduced ? "col-lg-3 col-md-8 col-sm-8" : "col-lg-12"}>
                <p>{reduced ? "" : "It will grow from "}<span className="date">{props.object.startDate}</span> to <span
                    className="date">{props.object.endDate}</span></p>
            </div>
            <div className={reduced ? "col-lg-8 col-md-12 col-sm-12" : "col-lg-12"}>
                <ProgressBar className="progressBar" animated now={progress}
                             variant={progress === 100 ? "success" : progress > 100 ? "danger" : "warning"}
                             label={progress < 100 ? getCurrentDayNumber() + "/" + props.object.numberOfDays + " Days" : "Finished"}/>
            </div>
            {props.object.remarks !== "" && reduced === false &&
            <div className="col-lg-12">
                <textarea className="form-control space"
                          name="content"
                          value={props.object.remarks}
                          rows={textNumberLines}
                          readOnly={true}
                />
            </div>
            }

            {reduced === false &&
            <div className="col-lg-12" >
                <button data-toggle="tooltip" data-placement="top"
                        title="Delete" onClick={handleDeleteClick}><DeleteIcon/></button>
            </div>
            }

            {/*{JSON.stringify(props.object)}*/}

        </div>
    </div>;
}

export default Sprout;
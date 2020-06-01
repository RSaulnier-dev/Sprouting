import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateSprout from "./CreateSprout";
import Sprout from "./Sprout";
import Zoom from "@material-ui/core/Zoom";
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2'

function App() {
    const [listSprouts, setListSprouts] = useState([]);
    const [reduceListItems, setReduceListItems] = useState(false);
    const [alertSproutReady, setAlertSproutReady] = useState(false);

    function addSprout(sprout) {
        setListSprouts((prevState) => {
            return [...prevState, sprout];
        });
    }

    function deleteSprout(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover it!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {

                setListSprouts(prevSList => {
                    return prevSList.filter((sprout, index) => {
                        return (index !== id);
                    });
                });

                Swal.fire(
                    'Deleted!',
                    'It has been deleted.',
                    'success'
                )
                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Everything is safe :)',
                    'error'
                )
            }
        })
    }

    function handleReduceClick(event) {
        event.preventDefault();
        document.getElementById('reduceButton').blur();
        setReduceListItems(reduceListItems !== true);
    }

    return <div>
        <Header/>

        {alertSproutReady &&
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Ready to harvest !</strong> One of your sprout has finished to grow.
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>}

        <CreateSprout onAdd={addSprout}/>

        {listSprouts.map((sprout, index) =>
            <Sprout
                key={uuid()}
                id={index}
                object={sprout}
                onDelete={deleteSprout}
                reduced={reduceListItems}
            />
        )}

        <Zoom in={listSprouts.length > 0}
              className="reduceButton roundButton"
              data-toggle="tooltip"
              data-placement="top"
              title={reduceListItems === false ? "Reduce" : "Expand"}>
                <button id="reduceButton" onClick={handleReduceClick}>
                {
                    reduceListItems === false ?
                        <span className="fas fa-compress-arrows-alt"/> :
                        <span className="fas fa-expand-arrows-alt"/>
                }
                </button>
        </Zoom>

        <Footer/>
    </div>
}

export default App;
import useRecorder from "./useRecorder";

function AddRecord(props){
    let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

    return (
        <div className="modal fade" id="RecordPick" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Record Message</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div className="modal-body">
                        <div className="row g-3">
                            <div className="col-auto">
                                <audio src={audioURL} controls/>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-primary sm" onClick={startRecording} disabled={isRecording} style={{ margin: "2px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-paperclip" viewBox="0 0 16 16">
                                        <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                                        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />                                </svg>
                                </button>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-primary sm" onClick={stopRecording} disabled={!isRecording} style={{ margin: "2px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-stop-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={() => props.addNewRec(audioURL)} data-bs-dismiss="modal">Done</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddRecord;

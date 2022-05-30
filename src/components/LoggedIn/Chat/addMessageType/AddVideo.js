import { useState } from "react";

function AddVideo(props) {
    const [videoInChat, setVideoInChat] = useState();

    return (
        <div className="modal fade" id="VideoPick" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Upload Video</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <input className="form-control" type="file" id="videoFile" accept="video/*"
                                       onChange={(e) => setVideoInChat(URL.createObjectURL(e.target.files[0]))}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={() => props.addNewVid(videoInChat)} data-bs-dismiss="modal">Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddVideo;

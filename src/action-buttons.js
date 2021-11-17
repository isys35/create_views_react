

export function SettingsButton(props) {
    return <div className="settings-icon" onClick={props.onClick}>
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	                                    viewBox="0 0 482.568 482.568">
                                <g>
                                    <g>
                                        <path d="M116.993,203.218c13.4-1.8,26.8,2.8,36.3,12.3l24,24l22.7-22.6l-32.8-32.7c-5.1-5.1-5.1-13.4,0-18.5s13.4-5.1,18.5,0
                                            l32.8,32.8l22.7-22.6l-24.1-24.1c-9.5-9.5-14.1-23-12.3-36.3c4-30.4-5.7-62.2-29-85.6c-23.8-23.8-56.4-33.4-87.3-28.8
                                            c-4.9,0.7-6.9,6.8-3.4,10.3l30.9,30.9c14.7,14.7,14.7,38.5,0,53.1l-19,19c-14.7,14.7-38.5,14.7-53.1,0l-31-30.9
                                            c-3.5-3.5-9.5-1.5-10.3,3.4c-4.6,30.9,5,63.5,28.8,87.3C54.793,197.518,86.593,207.218,116.993,203.218z"/>
                                        <path d="M309.193,243.918l-22.7,22.6l134.8,134.8c5.1,5.1,5.1,13.4,0,18.5s-13.4,5.1-18.5,0l-134.8-134.8l-22.7,22.6l138.9,138.9
                                            c17.6,17.6,46.1,17.5,63.7-0.1s17.6-46.1,0.1-63.7L309.193,243.918z"/>
                                        <path d="M361.293,153.918h59.9l59.9-119.7l-29.9-29.9l-119.8,59.8v59.9l-162.8,162.3l-29.3-29.2l-118,118
                                            c-24.6,24.6-24.6,64.4,0,89s64.4,24.6,89,0l118-118l-29.9-29.9L361.293,153.918z"/>
                                    </g>
                                </g>
                        </svg>
            </div>
}



export function CancelButton(props) {
    return <div className="cancel-button" onClick={props.onClick}>
                <svg  id="Layer_1"   viewBox="0 0 512 512"   xmlns="http://www.w3.org/2000/svg">
                    <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
                </svg>
           </div>
}


export function EditButton(props) {
    return <div className="edit-button" onClick={props.onClick}>
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8787 1.70705C17.0503 0.535478 18.9497 0.535474 20.1213 1.70705L22.2929 3.87862C23.4645 5.05019 23.4645 6.94969 22.2929 8.12126L8.29289 22.1213C7.73028 22.6839 6.96722 22.9999 6.17157 22.9999H2C1.44772 22.9999 1 22.5522 1 21.9999V17.8284C1 17.0327 1.31607 16.2697 1.87868 15.7071L15.8787 1.70705ZM18.7071 3.12126C18.3166 2.73074 17.6834 2.73074 17.2929 3.12126L15.4142 4.99994L19 8.58573L20.8787 6.70705C21.2692 6.31653 21.2692 5.68336 20.8787 5.29284L18.7071 3.12126ZM17.5858 9.99994L14 6.41416L3.29289 17.1213C3.10536 17.3088 3 17.5632 3 17.8284V20.9999H6.17157C6.43679 20.9999 6.69114 20.8946 6.87868 20.707L17.5858 9.99994Z"/>
                </svg>
            </div>
}

export function SaveButton(props) {
    return <div className="save-button" onClick={props.onClick}>
                <svg width="64" height="64" viewBox="0 0 64 64">
                    <path d="M61.5 24C61.4972 23.6588 61.3811 23.3281 61.17 23.06L45.17 3.12C45.0371 2.93234 44.862 2.77849 44.6588 2.6708C44.4556 2.56312 44.2299 2.50462 44 2.5H8C6.54212 2.50264 5.14471 3.08295 4.11383 4.11383C3.08295 5.14471 2.50264 6.54212 2.5 8V56C2.50264 57.4579 3.08295 58.8553 4.11383 59.8862C5.14471 60.917 6.54212 61.4974 8 61.5H56C57.4579 61.4974 58.8553 60.917 59.8862 59.8862C60.917 58.8553 61.4974 57.4579 61.5 56V24ZM35.07 5.5V12.64H16.21V5.5H35.07ZM16.21 58.5V33.5H47.79V58.5H16.21ZM58.5 56C58.5 56.663 58.2366 57.2989 57.7678 57.7678C57.2989 58.2366 56.663 58.5 56 58.5H50.79V32C50.79 31.6022 50.632 31.2206 50.3507 30.9393C50.0694 30.658 49.6878 30.5 49.29 30.5H14.71C14.3122 30.5 13.9306 30.658 13.6493 30.9393C13.368 31.2206 13.21 31.6022 13.21 32V58.5H8C7.33696 58.5 6.70107 58.2366 6.23223 57.7678C5.76339 57.2989 5.5 56.663 5.5 56V8C5.5 7.33696 5.76339 6.70107 6.23223 6.23223C6.70107 5.76339 7.33696 5.5 8 5.5H13.21V14.14C13.21 14.5378 13.368 14.9194 13.6493 15.2007C13.9306 15.482 14.3122 15.64 14.71 15.64H36.57C36.9678 15.64 37.3494 15.482 37.6307 15.2007C37.912 14.9194 38.07 14.5378 38.07 14.14V5.5H43.28L58.5 24.5V56Z"/>
                    <path d="M40.36 37.3601H23.64C23.2422 37.3601 22.8607 37.5181 22.5794 37.7994C22.2981 38.0808 22.14 38.4623 22.14 38.8601C22.14 39.2579 22.2981 39.6395 22.5794 39.9208C22.8607 40.2021 23.2422 40.3601 23.64 40.3601H40.36C40.7578 40.3601 41.1394 40.2021 41.4207 39.9208C41.702 39.6395 41.86 39.2579 41.86 38.8601C41.86 38.4623 41.702 38.0808 41.4207 37.7994C41.1394 37.5181 40.7578 37.3601 40.36 37.3601Z" />
                    <path d="M40.36 44.3601H23.64C23.2422 44.3601 22.8607 44.5181 22.5794 44.7994C22.2981 45.0808 22.14 45.4623 22.14 45.8601C22.14 46.2579 22.2981 46.6395 22.5794 46.9208C22.8607 47.2021 23.2422 47.3601 23.64 47.3601H40.36C40.7578 47.3601 41.1394 47.2021 41.4207 46.9208C41.702 46.6395 41.86 46.2579 41.86 45.8601C41.86 45.4623 41.702 45.0808 41.4207 44.7994C41.1394 44.5181 40.7578 44.3601 40.36 44.3601Z" />
                    <path d="M40.36 54.3601H23.64C23.2422 54.3601 22.8607 54.2021 22.5794 53.9208C22.2981 53.6395 22.14 53.2579 22.14 52.8601C22.14 52.4623 22.2981 52.0808 22.5794 51.7994C22.8607 51.5181 23.2422 51.3601 23.64 51.3601H40.36C40.7578 51.3601 41.1394 51.5181 41.4207 51.7994C41.702 52.0808 41.86 52.4623 41.86 52.8601C41.86 53.2579 41.702 53.6395 41.4207 53.9208C41.1394 54.2021 40.7578 54.3601 40.36 54.3601V54.3601Z" />
                </svg>
            </div>
}



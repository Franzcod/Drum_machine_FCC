
const audioClips = [
        {
          keyCode: 81,
          keyTrigger: 'Q',
          id: 'Heater-1',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
        },
        {
          keyCode: 87,
          keyTrigger: 'W',
          id: 'Heater-2',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
        },
        {
          keyCode: 69,
          keyTrigger: 'E',
          id: 'Heater-3',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
        },
        {
          keyCode: 65,
          keyTrigger: 'A',
          id: 'Heater-4',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
        },
        {
          keyCode: 83,
          keyTrigger: 'S',
          id: 'Clap',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
        },
        {
          keyCode: 68,
          keyTrigger: 'D',
          id: 'Open-HH',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
        },
        {
          keyCode: 90,
          keyTrigger: 'Z',
          id: "Kick-n'-Hat",
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
        },
        {
          keyCode: 88,
          keyTrigger: 'X',
          id: 'Kick',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
        },
        {
          keyCode: 67,
          keyTrigger: 'C',
          id: 'Closed-HH',
          url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
        }
];



function App() {

  const [volume , serVolume] = React.useState(0.5);

  const [recording, setRecording] = React.useState('');

  const [speed, setSpeed] = React.useState(0.5);

  const playRecording = () => {
    let index = 0;
    let recordArray = recording.split(' ');
    const interval = setInterval(()=>{
      const audio = document.getElementById(recordArray[index]); 
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play();
      index++;
    },speed * 600);
    setTimeout(()=> clearInterval(interval), 600 * speed * recordArray.length - 1);
  };


    return (
        <div className="container  text-white" >
            <div className="text-center">
                <h6>Free Code Camp Project</h6>
                <h1>Drum Machine</h1>
                <div className='contBotonera' id="drum-machine">
                  {
                    audioClips.map(clip => (
                        <Pad 
                          className='drum-pad'
                          id={clip.id} 
                          key={clip.keyCode} 
                          clip={clip} 
                          volume={volume} 
                          setRecording={setRecording}
                        />
                    ))
                  }
                </div>
                <br/>
                <h4>Volume</h4>
                <div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    onChange={(e) => serVolume(e.target.value)}
                    value={volume} 
                    className="w-50" 
                    id="volume" 
                  />
                  <p>{Math.trunc(volume * 100)}</p>
                </div>

                <br/>

                <div>
                  <h4 id="display">{recording}</h4>
                  {
                    recording && 
                      <div>
                        <button
                          onClick={() => setRecording('')}
                          className="btn btn-outline-danger m-3" 
                        >Clear</button>
                      
                        <button 
                          onClick={playRecording}
                          className="btn btn-success" 
                        >Play</button>
                        <br/>
                        <h5>+ Speed  -</h5>
                        <input 
                          type="range" 
                          min="0.1" 
                          max="1.2" 
                          step="0.01" 
                          onChange={(e) => setSpeed(e.target.value)}
                          value={speed} 
                          className="w-50" 
                          id="volume" 
                        />
                      </div>

                      

                    
                  }
                </div>
            </div>
        </div>
    )
}



function Pad({clip, volume, setRecording})  {
  
  const [active, setActive] = React.useState(false);


    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          console.log('cleanup');
            document.removeEventListener('keydown', handleKeyDown);
        }
        
    }, [])


    const handleKeyDown = (e) => {
        if(e.keyCode === clip.keyCode) {
            
            playSound();
        }
    }
    

    const playSound = () => {
        const audio = document.getElementById(clip.keyTrigger); 
        setActive(true);
        setTimeout(() => {
          setActive(false);
        }, 200);
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play();
        setRecording(prev => prev + clip.keyTrigger + ' ');
    }

    return (
        <div id={clip.id} type="button" className={`btn btn-secondary p-4 m-3 drum-pad ${active && 'btn-light' }`} onClick={playSound}>
            <audio className="clip" src={clip.url} id={clip.keyTrigger}/>
            {clip.keyTrigger}
            
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));
(() => {
	// variables always come first
	// set up puzzle pieces and board
	const pieces = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
	// const never changes
	let piecesBoard = document.querySelector(".puzzle-pieces"),
		puzzleBoard = document.querySelector(".puzzle-board"),
		puzzleSelectors = document.querySelectorAll("#buttonHolder img"),
        dropZones = document.querySelectorAll('.drop-zone');

	// functions go in the middle
	function createPuzzlePieces(pictureIndex) {
		// generate puzzle pieces for left hand side
		// debugger;
		pieces.forEach((piece, index) => {
			let newPuzzlePieces = `<img draggable id="piece${index}" class="puzzle-image" src="images/${piece + pictureIndex}.jpg" alt="thumbnail">`

			piecesBoard.innerHTML += newPuzzlePieces;
		});

		puzzleBoard.style.backgroundImage = `url(images/backGround${pictureIndex}.jpg)`

		initDrag();
	}

	// drag n drop functionality goes here
	
	function initDrag() {
		piecesBoard.querySelectorAll('img').forEach(img => {
			img.addEventListener("dragstart", function(e) {
				// e.preventDefault();
				console.log('draggin...')

				e.dataTransfer.setData("text/plain", this.id);
			});
		});
	}

	// handle dragover and drop
	dropZones.forEach(zone => {
        
        //set up drop counter
        var dropCounter = 0;
        
		zone.addEventListener("dragover", function(e) {
			e.preventDefault();
			console.log('you dragged over me!');
		});

		zone.addEventListener("drop", function(e) {
			e.preventDefault();
			console.log('you dropped something on me');

			let piece = e.dataTransfer.getData("text/plain");
			e.target.appendChild(document.querySelector(`#${piece}`));
            
            //counter increase by 1 on drop
            dropCounter += 1;
            console.log('Counter = ' + dropCounter);
            
            //if drop counter is > 1 piece goes back to pieces board
            if (dropCounter > 1) {
                piecesBoard.appendChild(document.querySelector(`#${piece}`));
            }
		});
        
        //Reset pieces when clicked to the pieces board
        zone.addEventListener("click", function(e) {
            console.log('clicked me');
            
            //take images removes it and places back into pieces board
            let images = e.target;
            zone.removeChild(images);
            piecesBoard.appendChild(images);
            dropCounter = 0;
            }); 
        
        //drag start in zone, resets counter to 0 to allow another piece into zone
        zone.addEventListener('dragstart', function(e) {
            console.log('drag');
            dropCounter = 0;
        });
        
        //counter reset on puzzle selector click
        puzzleSelectors.forEach(puzzle => puzzle.addEventListener('click', function(e) {
            dropCounter = 0;
        }));
	});
    
    //Basic reset of drop zone html
    function resetDropZone() {
        dropZones.forEach(zone => {
            zone.innerHTML = "";
        });
    }

    function resetPuzzlePieces() {
		// empty the thumbnail container
		piecesBoard.innerHTML = "";
        resetDropZone();
		createPuzzlePieces(this.dataset.puzzleref);
	}

	//event handling goes at the bottom
	puzzleSelectors.forEach(puzzle => puzzle.addEventListener('click', resetPuzzlePieces));

	createPuzzlePieces(0);
	
	
})();
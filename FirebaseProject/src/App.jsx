import "./App.css";
import Auth from "../component/auth";
import { auth, db } from "../config/fireBase";

import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
    const [movieList, setMovieList] = useState([]);

    // New Movie States
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newReleaseDate, setNewReleaseDate] = useState(0);
    const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

    // Update Title State
    const [updatedTitle, setUpdatedTitle] = useState("");

    const moviesCollectionRef = collection(db, "movies");

    const getMovieList = async () => {
        try {
            const data = await getDocs(moviesCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setMovieList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getMovieList();
    }, []);

    const onSubmitMovie = async () => {
        try {
            await addDoc(moviesCollectionRef, {
                title: newMovieTitle,
                releaseDate: newReleaseDate,
                receivedAnOscar: isNewMovieOscar,
                userId: auth?.currentUser?.uid,
            });
            getMovieList();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteMovie = async (id) => {
        const movieDoc = doc(db, "movies", id);
        await deleteDoc(movieDoc);
        getMovieList();
    };

    const updateMovieTitle = async (id) => {
        const movieDoc = doc(db, "movies", id);
        await updateDoc(movieDoc, { title: updatedTitle });
        getMovieList();
    };

    return (
        <>
            <Auth />

            <div>
                <input
                    placeholder="Movie title..."
                    onChange={(e) => setNewMovieTitle(e.target.value)}
                />
                <input
                    placeholder="Release Date..."
                    type="number"
                    onChange={(e) => setNewReleaseDate(Number(e.target.value))}
                />
                <input
                    type="checkbox"
                    checked={isNewMovieOscar}
                    onChange={(e) => setIsNewMovieOscar(e.target.checked)}
                />
                <label> Received an Oscar</label>
                <button onClick={onSubmitMovie}> Submit Movie</button>
            </div>

            <div key={1}>
                {movieList.map((movie) => (
                    <div>
                        <h1
                            style={{
                                color: movie.receivedAnOscar ? "green" : "red",
                            }}
                        >
                            {movie.title}
                        </h1>
                        <p> Date: {movie.releaseDate} </p>

                        <button onClick={() => deleteMovie(movie.id)}>
                            {" "}
                            Delete Movie
                        </button>

                        <input
                            placeholder="new title..."
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                        <button onClick={() => updateMovieTitle(movie.id)}>
                            {" "}
                            Update Title
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;

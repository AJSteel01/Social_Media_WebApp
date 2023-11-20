import React ,{ useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { getPosts, getPostsBySearch }  from '../../actions/posts.js';
import Pagination from '../Pagination.jsx';
import{Container, Grow,Grid, Paper,AppBar,TextField,Button} from "@material-ui/core";
// import useStyles from '../../styles.js';
import Posts from '../Posts/Posts.js';
import Form from '../Form/Form.js';
import useStyles from './styles.js';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const Home = () => {
    const [currentId , setCurrentId] = useState(0);
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search , setSearch]=useState('');
    const [tags, setTags] = useState([]);
    const history = useHistory();

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [currentId,dispatch]);

    const searchPost = () => {
        if(search.trim() || tags){
            //dispatch logic to fetch search post
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
            history.push('/');
        }
    };

    const handleKeyPress =(e) =>{
        if(e.keyCode=== 113){
            //searchPost
            searchPost();
        }
    }

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
  return (
            <Grow in>
                <Container maxWidth="xl">
                    <Grid className={classes.mainContainer} container justifyContent="space-between" alignitems="stretch" spacing={3}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField 
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                onKeyDown={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                />
                                <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={ handleAddChip}
                                onDelete={handleDeleteChip}
                                label="Search Tags"
                                variant="outlined"
                                /> 
                                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>

                            </AppBar>
                            <Form  currentId={currentId} setCurrentId={setCurrentId} />
                            {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
  )
}

export default Home;
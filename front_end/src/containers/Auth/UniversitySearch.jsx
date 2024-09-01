import React, { useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl as Input, FormLabel as Label } from 'react-bootstrap';

// CUSTOM
import { searchUniversity } from './slice';
import debounce from '../../utils/debounce'

const UniversitySearch = ({ error, getUniversity }) => {

    const dispatch = useDispatch();
    const { universities, universitiesPending } = useSelector(state => state.auth);
    const [showResults, setShowResults] = useState('hide');
    const [uniSelected, setUniSelected] = useState(null);

    const universitySearch = (e) => {
        dispatch(searchUniversity(e.target.value));
    }

    const universitySelect = (id, name) =>{
        setUniSelected([id, name]); 
        setShowResults('hide');
        getUniversity(id);
    }

    // server side filtering prevents request to be sent every time a key is pressed
    const debouncedSearch = debounce(universitySearch, 400);

    return (
        <div className={error ? 'error' : ''} >

            <input type='hidden' value={uniSelected ? uniSelected[0] : ''} />
            <Label>University</Label>
            <Input type='text'
                className='universitySearch'
                placeholder='Search'
                name='university'
                onKeyUp={(e) => {
                    debouncedSearch(e);
                }}
                onFocus={() => setShowResults('')}
                // onBlur={() => setShowResults('hide')}
            />

            {/* renders the list of universites based on the search paramaters */}
            <div className={'universities ' + showResults}>
                {(universitiesPending && <div className='searchMessage'>Loading...</div>) ||
                    (!universities && <div className='searchMessage'></div>) ||
                    (universities.length === 0 && <div className='searchMessage'>No Matches Found</div>) ||
                    (<div>
                        {
                            universities.map((uni, i) => {
                                return <div key={i} onClick={()=> universitySelect(uni._id, uni.name)} className='uni'>{uni.name}</div>
                            })
                        }
                    </div>)
                }
            </div>
            <span className='error'>{error} &nbsp;</span>

        </div>
    );
}

export default UniversitySearch;
import React, { useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl as Input, FormLabel as Label } from 'react-bootstrap';

// CUSTOM
import { searchUniversity } from './slice';
import camera from '../../icons/camera.png';
import { defaultPic, imgUploadConfig } from '../../utils/globals';
import debounce from '../../utils/debounce'

const UniversitySearch = () => {

    const dispatch = useDispatch();
    const { universities, universitiesPending } = useSelector(state => state.auth);
    const [uniDrop, setUniDrop] = useState('hide');
    const [uniSelected, setUniSelected] = useState(null);

    // local state for form values
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        university: '',
        profilePicture: defaultPic,   // blob or default image
        pictureExt: '',               // jpg png
        profilePictureUrl: ''          // url for the blob
    });

    const universitySearch = (e) => {
        dispatch(searchUniversity(e.target.value));
    }

    // server side filtering prevents request to be sent every time a key is pressed
    const debouncedSearch = debounce(universitySearch, 400);



    return (
        <div className={errors.university ? 'error' : ''} >

            <input type='hidden' value={uniSelected ? uniSelected[0] : ''} />
            <Label>University</Label>
            <Input type='text'
                className='universitySearch'
                placeholder='Search'
                name='university'
                onKeyUp={(e) => {
                    debouncedSearch(e);
                }}
                onFocus={() => setUniDrop('')}
            // onBlur={() => setUniDrop('hide')}
            />
            <div className={'universities ' + uniDrop}>
                {(universitiesPending && <div className='searchMessage'>Loading...</div>) ||
                    (!universities && <div className='searchMessage'></div>) ||
                    (universities.length === 0 && <div className='searchMessage'>No Matches Found</div>) ||
                    (<div>
                        {
                            universities.map((uni, i) => {
                                return <div key={i} onClick={() => { setUniSelected([uni._id, uni.name]); setUniDrop('hide') }} className='uni'>{uni.name}</div>
                            })
                        }
                    </div>)
                }
            </div>
            <span className='error'>{errors.university} &nbsp;</span>

        </div>
    );
}

export default UniversitySearch;
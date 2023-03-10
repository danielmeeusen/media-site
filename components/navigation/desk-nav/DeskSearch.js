import React, { useState, useRef } from 'react';
import Router from 'next/router';

import { IconButton, Divider, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import HistoryIcon from '@material-ui/icons/History';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

import { fetcher } from '@/lib/fetch';


export const useStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    height: 40,
    width: '100%',
    borderRadius: '30px',
    backgroundColor: theme.palette.boxShadow.searchBackground,
    '&:hover': {
      backgroundColor: theme.palette.boxShadow.searchBackgroundHover,
    }
  },
  input: {
    flex: 1,
    marginLeft: '20px',
    paddingTop: '4px',
    color: theme.palette.text.primary,
    "&:-webkit-autofill": {
      WebkitBoxShadow: theme.palette.boxShadow.searchAutofill,
      "&:hover": {
        WebkitBoxShadow: theme.palette.boxShadow.searchAutofillHover,
      },
      WebkitTextFillColor: theme.palette.text.primary,
    },
  },
  clearButton: {
    color: theme.palette.custom.seventyFive,
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.boxShadow.searchBackgroundHover,
    },
  },
  searchButton: {
    marginRight: '5px',
    color: theme.palette.custom.seventyFive,
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.boxShadow.searchBackgroundHover,
    },
  },
  divider: {
    margin: '4px 0px',
    height: '32px',
  },
}));

export default function DeskSearch() {
  const classes = useStyles();
  const inputRef = useRef();  
  const [searchValue, setSearchValue] = useState('');
  const [ autocompleteValue, setAutocompleteValue ] = useState([]);
  let searches = [...new Set(JSON.parse(localStorage.getItem('searches')))] || [];
  searches = searches.map(search => search.replaceAll('_', ' '));
  
  const handleSearchHistory = (value) => {
    value = value.replaceAll(' ', '_');
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches = searches.slice(0, 10);
    searches.unshift(value);
    localStorage.setItem('searches', JSON.stringify(searches));
  }

  const handleChange = async (e, value) => {  
    if (!value) {
      value = (e.target.innerText || e.target.value || searchValue || '');
    }   
    value = value.replaceAll('_', ' ');
    setSearchValue(value);
    if (value) {
      let data = await fetcher(`/api/autocomplete/${value}`);
      data && data.map(item => item.name = item.name.replaceAll('_', ' '));
      setAutocompleteValue(data || []);
    };
  };

  const handleSearch = async (e, value) => {
    e.preventDefault();
    if (!value) {
      value = (e.target.innerText || e.target.value || searchValue || '');
    }
    const data = await fetcher(`/api/tag?name=${value.replaceAll(' ','_')}`);
    const type = data ? 'filter' : 'search';
    setSearchValue(value);
    handleSearchHistory(value);
    if(type == 'filter') value = value.replaceAll(' ', '_');
    Router.push({
      pathname: '/results/',
      query: {
        type: type, 
        keywords: value 
      },
    });
  }

  const handleClear = (e) => {
    setSearchValue('');
    setAutocompleteValue([]);
    inputRef.current.focus();
  }

  return (
    <form className={classes.search} onSubmit={(e, value) => handleSearch(e, value, 'search')}>
      <Autocomplete
        disableClearable
        className={classes.input}
        freeSolo
        value={searchValue}
        onChange={(e, value) => handleSearch(e, value, 'filter')}
        options={searchValue ? (autocompleteValue[0] ? autocompleteValue.map((obj) => obj.name) : ["no results"]) : searches}
        renderOption={option => {
          if (searchValue) {
            return option;
          } else {
            return (
              <Typography>
                <HistoryIcon color="disabled" fontSize="small" style={{ marginRight: 6 }} /> {option}
              </Typography>
            );
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search"
            onChange={handleChange}
            inputRef={inputRef}
            InputProps={{ ...params.InputProps, disableUnderline: true }}
          />
        )}
      />

      {searchValue &&
        <IconButton
          color="primary"
          className={classes.clearButton}
          aria-label="clear search"
          onClick={handleClear}
        >
          <ClearIcon />
        </IconButton>
      }

      <Divider className={classes.divider} orientation="vertical" />

      <IconButton
        color="primary"
        className={classes.searchButton}
        aria-label="search"
        onClick={ searchValue ? handleSearch : null }
      >
        <SearchIcon />
      </IconButton>

    </form>
  );
};
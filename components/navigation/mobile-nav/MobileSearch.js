import React, { useContext, useState, forwardRef, useRef } from 'react';
import Router from 'next/router';

import { Dialog, Slide, Divider, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CancelIcon from '@material-ui/icons/Cancel';
import HistoryIcon from '@material-ui/icons/History';

import Link from '@/components/shared/Link';
import { mobileBottomContext, searchValueContext } from '@/lib/AppContext';
import { fetcher } from '@/lib/fetch';

export const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: '100%',
    height: '100%',
  },
  search: {
    display: 'flex',
    height: 60,
    width: '100%',
    },
    input: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: theme.palette.boxShadow.searchAutofill,
        "&:hover": {
          WebkitBoxShadow: theme.palette.boxShadow.searchAutofillHover,
        },
        WebkitTextFillColor: theme.palette.text.primary
      },
      outline: 'none !important',
      flex: 1,
      border: 'none',
      backgroundColor: 'transparent',
      color: theme.palette.text.primary,
      '-webkit-box-shadow': 'none',
      '-moz-box-shadow': 'none',
      flex: 1,
      fontSize: '20px',
      marginLeft: '-15px',
    },
  link: {
    color: theme.palette.text.primary,
    paddingLeft: '20px',
    fontSize: '20px',
  },
  history: {
    color: theme.palette.text.primary,
    paddingLeft: '10px',
    fontSize: '20px',
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MobileSearch() {
  const classes = useStyles();
  const inputRef = useRef();
  const [ mobileBottom, setMobileBottom ] = useContext(mobileBottomContext);
  const [ searchValue, setSearchValue ] = useContext(searchValueContext);
  const [ autocompleteValue, setAutocompleteValue ] = useState([]);

  
  let searches = JSON.parse(localStorage.getItem('searches')) || [];
  searches = searches.map(search => search.replaceAll('_', ' '));
  
  const handleClose = () => {
    setMobileBottom('Home');
  };

  const handleSearchHistory = async (value) => {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches = searches.slice(0, 10);
    searches.unshift(value);
    localStorage.setItem('searches', JSON.stringify(searches));
  };

  const handleChange = async (e) => {
    if(e.target.value) {
      setSearchValue(e.target.value);
      let data = await fetcher(`/api/autocomplete/${e.target.value}`);
      data.map(item => item.name = item.name.replaceAll('_', ' '));
      setAutocompleteValue(data);
    } else {
      setSearchValue('');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    handleChange(e);
    const data = await fetcher(`/api/tag?name=${searchValue.replaceAll(' ','_')}`);
    const type = data ? 'filter' : 'search';
    handleSearchHistory(searchValue);
    if(searchValue){
      Router.push({
        pathname: '/results/',
        query: {
          type: type, 
          keywords: type == 'search' ? searchValue : searchValue.replaceAll(' ','_'),
        },
      });
    };
    setMobileBottom('Home');
  }

  const handleSelect = async (value) => {
    const data = await fetcher(`/api/tag?name=${value.replaceAll(' ','_')}`);
    const type = data ? 'filter' : 'search';
    handleSearchHistory(value);
    Router.push({
      pathname: '/results/',
      query: {
        type: type, 
        keywords: type == 'search' ? value : value.replaceAll(' ','_'),
      },
    });
    setMobileBottom('Home');
  };

  const handleClear = (e) => {
    setSearchValue('');
    setAutocompleteValue([]);
    inputRef.current.focus();
  }

  return (
    <Dialog
      fullScreen
      open={mobileBottom == 'Search'}
      onClose={handleClose}
      TransitionComponent={Transition}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <>
        <form className={classes.search} onSubmit={handleSearch} action=".">
          <IconButton onClick={handleClose} >
            <ArrowBackIosIcon />
          </IconButton>   
          <input
            className={classes.input}
            ref={inputRef}
            autoFocus
            type="search"
            autoComplete="off"
            value={searchValue}
            placeholder="Search"
            onChange={handleChange}
          />          
            {searchValue && 
              <IconButton 
                color="secondary" 
                onClick={handleClear}
              >
                <CancelIcon />
              </IconButton>
            }
          </form>

       <Divider color="secondary" orientation="horizontal" />
       {searchValue &&
       <List>
       {autocompleteValue?.map((item, index) => {
        const text = item.name;
        return (
          <div key={item.name}>
              <ListItem button >
                <ListItemText onClick={ () => handleSelect(text) }>
                  <span className={classes.link} > { text } </span>
                </ListItemText>
              </ListItem>
            <Divider />
        </div>
        )} 
      )}
      </List>
      }

      {!searchValue &&
      <List>
       {searches?.map((item, index) => {
        const text = item;
        return (
          <div key={`${item}_${index}`}>
          <Link 
            href={{pathname: '/results/',
              query: {
              type: 'filter',
              keywords: item.replaceAll(' ', '_')
              }
            }}
            >
              <ListItem button onClick={handleClose} >
                <ListItemText >
                  <HistoryIcon color="disabled" style={{ float: 'left'}} />
                   <span className={classes.history} > {text} </span>
                </ListItemText>
              </ListItem>
            </Link>
            <Divider />
        </div>
        )} 
      )}
      </List>
      }
       </>
    </Dialog> 
);
}  
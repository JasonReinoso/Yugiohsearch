import React from "react";
import HomeIcon from '@mui/icons-material/Home';

import RuleIcon from '@mui/icons-material/Rule';

import {AttachMoney} from '@mui/icons-material/'

import { AutoFixHigh } from "@mui/icons-material/";

export const MenuItem = [
    {
        title: "Home",
        icon:<HomeIcon />,
        path: "/"

    },
    
    {
        title: "Price History",
        icon:<AttachMoney />,
        path: "/Temp"

    },
    {
        title: "Edit Deck",
        icon:<AutoFixHigh />,
        path: "/Createdeck"

    },

    {
        title: "Ban List",
        icon:<RuleIcon />,
        path: "/Banlist"

    },
   
    
]
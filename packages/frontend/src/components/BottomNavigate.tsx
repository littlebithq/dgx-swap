import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNavigate = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/split') {
      setValue(0);
    } else if (pathname === '/merge') {
      setValue(1);
    }
  }, [pathname]);

  return (
    <div className="BottomNavigateContainer">
      <BottomNavigation
        className="BottomNavigate"
        showLabels
        value={value}
        onChange={(event, newValue) => {
          if (newValue === 2) {
            return;
          }
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          onClick={() => {
            navigate('/split');
          }}
          className={value === 0 ? 'BottomNavigateAction BottomNavigateActionSelected' : 'BottomNavigateAction'} label="Split"
          icon={<CallSplitIcon fontSize="large" />} />
        <BottomNavigationAction
          onClick={() => {
            navigate('/merge');
          }}
          className={value === 1 ? 'BottomNavigateAction BottomNavigateActionSelected' : 'BottomNavigateAction'} label="Merge"
          icon={<MergeTypeIcon fontSize="large" />} />
        <BottomNavigationAction
          className={value === 2 ? 'BottomNavigateAction BottomNavigateActionSelected' : 'BottomNavigateAction'} label="Wallet"
          icon={<AccountBalanceWalletIcon fontSize="large" />} />
      </BottomNavigation>
    </div>
  );
}

export default BottomNavigate;

import React from 'react';
import { useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SeverityChip from './LogViewer/SeverityChip';

const MAX_VISIBLE_COUNT = 999;

const getCounterValue = (value) => (
  value < MAX_VISIBLE_COUNT ? value : `${MAX_VISIBLE_COUNT}+`
);

export default function Statistics() {
  const showLabel = useMediaQuery('(min-width:450px)');
  const { counts } = useSelector((state) => state.logCache);
  const counters = [
    { type: 'info', value: counts.info, label: 'INFO' },
    { type: 'warning', value: counts.warning, label: 'ERROR' },
    { type: 'error', value: counts.error, label: 'WARNING' },
  ];
  return counters.map((counter) => {
    const label = showLabel ? `${counter.label}: ` : '';
    return (
      <SeverityChip
        type={counter.type}
        label={`${label}${getCounterValue(counter.value)}`}
      />
    );
  });
}

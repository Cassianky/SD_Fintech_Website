// button 

import Link from 'next/link'
import { Button } from '@material-ui/core'

const ProjButtonComponent = (props) => (
  <Link href="/department/machinelearning_department/ml_project4.js" passHref>
    <Button component="a">Click to find out more!</Button>
  </Link>
);

export default ProjButtonComponent;

// button 

import Link from 'next/link'
import { Button } from '@material-ui/core'

const ProjButtonComponent = (props) => (
  <Link href="/department/machinelearning/companynewssentimentanalysis" passHref>
    <Button component="a">Click to find out more!</Button>
  </Link>
);

export default ProjButtonComponent;

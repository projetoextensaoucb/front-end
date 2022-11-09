import NextLink from 'next/link';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Voltar(props) {
    return (
        <NextLink
            href={props.destino}
            passHref
        >
            <Button
                component="a"
                startIcon={<ArrowBackIcon fontSize="small" />}
            >
                Voltar
            </Button>
        </NextLink>
    )
}
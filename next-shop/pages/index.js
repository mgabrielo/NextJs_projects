import { Grid, Card, CardContent, CardActions, Button, CardActionArea, Typography, CardMedia, Link } from '@material-ui/core'
import NextLink from 'next/link'
import Layout from '../components/Layout'
import data from '../utils/data'


export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {data.products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <Link href={`/product/${product.slug}`}>
                  <CardActionArea>
                    <CardMedia component="img" image={product.image} title={product.name}></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size='small' color='primary'>Add to Cart</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

    </Layout>

  )
}

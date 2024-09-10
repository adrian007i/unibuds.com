<!-- PROJECT LOGO -->
 
<div align="center">
    <br />
    <a href="https://github.com/github_username/repo_name">
        <img src="../readme/logo.svg" alt="Logo" width="80" height="80">
    </a>

<h3 align="center" >UniBuds</h3> 
    <p align="center">
        App for university students to connect and make friends.  
    </p> 
</div>
 
<br /><br />

# Setup AWS S3 Bucket

1) Signup or Login to [AWS](https://us-east-1.console.aws.amazon.com/console/home?region=us-east-1)
2) Create an S3 bucket
3) Configure bucket permissions:
    
    We will be accessing the image via a public endpoint.

    #### Set bucket Policy

    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadGetObject",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::unibuds/*"
            }
        ]
    }
    ```

    #### Ensure "Block all public access" is turned off
    ![alt text](../readme/public_aws_access.png)
3) Create AWS Access Key with the permissions:
    - AmazonS3FullAccess

4) Add the following to your environment variables:
    - S3BucketName
    - AWS_KEY
    - AWS_SECRET 



# Deploying the API with Docker

1) Ensure you have docker installed
2) Clone the repository 
3) cd backend
3) Run  `docker-compose up`

### Optional

Add a username and password for the MongoDB setup in the docker-compose.yml file.

 
<br />

[Live App](https://unibuds.vercel.app/) ·
[Report Bug](mailto:adrianjohn.developer@gmail.com?subject=I%20found%20a%20bug) .
[Report Bug](mailto:adrianjohn.developer@gmail.com?subject=I%20want%20a%20feature )

 

## Backend Tech
 

[![NodeJs][NodeJs]][NodeJs-url] [![redis][redis]][redis-url]   [![mongo][mongo]][Mongo-url] 

[![docker][docker]][docker-url] [![vercel][vercel]][vercel-url] [![circleci][circleci]][circleci-url]  [![aws][aws]][aws-url] 
 
 
 
<!-- Developer Contact -->
## Contact

Feel free to reach out!

### Adrian John

[![linkedin][linkedin]][linkedin-url] 
[![gmail][gmail]](mailto:adrianjohn.developer@gmail.com)
</br> 
#### My Email: adrianjohn.developer@gmail.com 

#### My Website: [adrianjohn.dev](https://adrianjohn.dev)

[linkedin]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://linkedin.com/in/dev-adrian

[gmail]:https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
 
  
 
[NodeJs-url]: https://nodejs.org/
[mongo-url]: https://www.mongodb.com/
[redis-url]: https://redis.io/
[vercel-url]: https://nextjs.org/
[docker-url]: https://www.docker.com/
[circleci-url]: https://circleci.com/
[aws-url]: https://aws.com/

 
[NodeJs]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[mongo]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[redis]: https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white
[vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=whit
[docker]:https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[circleci]:https://img.shields.io/badge/circleci-343434?style=for-the-badge&logo=circleci&logoColor=white
[aws]:https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white



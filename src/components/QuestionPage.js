import React, { Component } from 'react'
import { connect } from 'react-redux'


import { Link, useParams, withRouter } from 'react-router-dom'

class QuestionPage extends Component {

    render(){
        const id = this.props.match.params.id
        return (
            <h1>{id}</h1>
        )
    }
}

export default connect()(QuestionPage)
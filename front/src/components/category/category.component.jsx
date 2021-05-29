import React, { Component } from 'react'
import CategoryService from '../../services/category.service'
import Footer from '../footer/footer.component'
import './category.component.scss'
export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfCategories: [],
            name: '',
            cID: ''
        }
    }

    componentDidMount() {
        CategoryService.getCategory().then(
            res => {
                this.setState({ listOfCategories: res.data })
            }
        )
    }

    handleChange(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    handleEdit(cID, name) {
        this.setState({ cID: cID, name: name })
    }

    handleDelete(id,e) {
        e.preventDefault();
        CategoryService.deleteCategory(id);
        window.location.reload();
    }

    handleAddUpdate(id, e) {
        e.preventDefault();
        try {

            if (id === '') {
                CategoryService.createCategory(this.state.name)
            }
            else CategoryService.putCategory(id, this.state.name)

            window.location.reload();
        } catch (error) {
            alert(error.response.data.msg);
        }
    }

    render() {
        return (
            <div className="category-page">
                <div className="top">
                    <form className='category'>
                        <input type="text" name='name' id='name'
                            value={this.state.name} placeholder='New category'
                            onChange={this.handleChange.bind(this)}
                        />
                        <button className="add" onClick={this.handleAddUpdate.bind(this, this.state.cID)}>
                            add
                        </button>
                    </form>

                    <div className="row cate">
                        <div className="title col-md-6">
                            <div className="col-title">
                                name
                            </div>

                            <div className="cate-name">
                                {this.state.listOfCategories.map(p => (
                                    <div className="cn">
                                        {p.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="button col-md-6">
                            <div className="col-title">
                                button
                            </div>

                            <div className="btn">
                                {this.state.listOfCategories.map(p => (
                                    <div className="buttons">
                                        <button className="edit" onClick={this.handleEdit.bind(this, p._id, p.name)}>
                                            edit
                                        </button>

                                        <button className="delete" onClick={this.handleDelete.bind(this, p._id)}>
                                            delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* {this.state.listOfCategories.map(p => (
                            <div className="row cate-display">
                                <div className="name col-md-6">
                                    <div className="title">
                                        Name
                                    </div>

                                    <div className="name">
                                        {p.name}
                                    </div>
                                </div>

                                <div className="btns col-md-6">
                                    <button className="edit" onClick={this.handleEdit.bind(this, p._id, p.name)}>
                                        edit
                                    </button>

                                    <button className="delete" onClick={this.handleDelete.bind(this, p._id)}>
                                        delete
                                    </button>
                                </div>
                            </div>
                        ))} */}
                    </div>


                </div>
                <div className="down">
                    <Footer />
                </div>
            </div>
        )
    }
}
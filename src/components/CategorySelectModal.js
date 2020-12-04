import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { categoryModal } from "./styles"
const CategorySelectModal = (props) => {
    const [categoryList, setCategoryList] = useState([]);

    /////
    const fetchCategories = async () => {
        let { data: { trivia_categories } } = await axios.get("https://opentdb.com/api_category.php");
        setCategoryList(trivia_categories)

    }
    /////
    useEffect(() => {
        fetchCategories()
    }, [])

    /////
    const renderList = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => props.selectCategory(item.id)} style={categoryModal.categoryItemContainer}>
                <Icon name="book-outline" color="white" size={20} />
                <Text style={categoryModal.categoryItemText}>{item.name}</Text>
            </TouchableOpacity> 
        )
    }

    return (
        <Modal style={categoryModal.modal} isVisible={props.visibility} onBackdropPress={props.onClose}>
            <View style={categoryModal.container}>
                <FlatList
                    data={categoryList}
                    renderItem={renderList}
                    keyExtractor={(_, index) => index.toString()}
                />
 
            </View>
        </Modal>
    )
}

export { CategorySelectModal }




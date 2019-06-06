document.addEventListener("DOMContentLoaded",function(){
    
    const getHeshValueByName = (hashName) => {
        let locationHash = window.location.hash;
        let hashValue = null;

        if(locationHash) {
            locationHash = locationHash.substr(1);
            let hashList = locationHash.split('&').reduce( (result, item) => {
                let parts = item.split('=');
                result[parts[0]] = parts[1];
                return result;
            }, {});

            if( hashName in hashList) {
                hashValue = hashList[hashName];
            }
        }
        return hashValue;
    };

    const showTagsOnDOM = () => {
        const tags = getHeshValueByName('tags');
        if( tags) {
            let ul = document.getElementById('tagsList');
            let li;
            let text;
            //always empty list before adding new items
            ul.innerHTML = '';
            tags.split(',').forEach(element => {
                //check if the element is not empty, prevent useless dots
                if(element) {
                    li = document.createElement("li");
                    text = document.createTextNode(element);
                    li.appendChild(text);
                    ul.appendChild(li);
                }
            });
        }
    };

    //after lage loaded shows existing tags
    showTagsOnDOM();

    //on hash change update tags list
    window.onhashchange = showTagsOnDOM;

    //add new tags into hash tags
    document.getElementById('addTagForm').addEventListener('submit', (e) => {
        e.preventDefault();
        let tagInput = document.getElementById('tagInput');
        let newTag = tagInput.value;
        if(newTag) {
            let currentTags = getHeshValueByName('tags');
            window.location.hash = currentTags ? `#tags=${currentTags},${newTag}` : `#tags=${newTag}`;
            tagInput.value = '';
        }
    });

    //on tags list item click delete the item and update the hush
    //adding listener to parent element for dynamic added elements        
    document.getElementById('tagsList').addEventListener('click', (e) => {
    
        let li = e.target;
        li.remove();

        let remainedItems = this.getElementsByTagName('li');
        let newValue = [...remainedItems].map( item => item.textContent ).join();
        window.location.hash = `#tags=${newValue}`;

        if(!newValue) {
            history.replaceState(null, null, ' ');
        }
    });
});


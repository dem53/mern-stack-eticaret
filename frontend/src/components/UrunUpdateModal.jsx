import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UrunUpdateModal = ({ isOpen, onClose, product, onUpdate }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    useEffect(() => {
        setUpdatedProduct(product);
        setImageFiles([]);
        setExistingImages(product.imageUrls || []);
        setImagePreviews([]);
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUpdatedProduct(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024);
            if (validFiles.length !== files.length) {
                alert('Tüm dosyaların boyutu 5MB\'dan küçük olmalıdır!');
            }
            setImageFiles(validFiles);
            const previews = validFiles.map(file => URL.createObjectURL(file));
            setImagePreviews(previews);
        }
    };

    const handleRemoveExistingImage = (index) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveNewImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSizeChange = (e) => {
        const selectedSizes = Array.from(e.target.selectedOptions, option => option.value);
        setUpdatedProduct(prev => ({ ...prev, size: selectedSizes }));
    };

    const handleTagChange = (e) => {
        const selectedTags = Array.from(e.target.selectedOptions, option => option.value);
        setUpdatedProduct(prev => ({ ...prev, tags: selectedTags }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('authToken');
            const formData = new FormData();

            // Form verilerini ekle
            for (const key in updatedProduct) {
                if (key === 'imageUrls') {
                    formData.append('existingImages', JSON.stringify(existingImages));
                } else if (key === 'tags') {
                    formData.append('tags', JSON.stringify(updatedProduct.tags || []));
                } else if (key === 'size') {
                    formData.append('size', JSON.stringify(updatedProduct.size || []));
                } else {
                    formData.append(key, updatedProduct[key].toString());
                }
            }

            // Yeni resimleri ekle
            imageFiles.forEach((file) => {
                formData.append('images', file);
            });

            const response = await axios.patch(`http://localhost:8000/getUpdate/${updatedProduct._id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                onUpdate(response.data.post);
                window.location.reload();
            } else {
                alert('Güncelleme sırasında bir hata oluştu.');
            }
        } catch (error) {
            console.error('Güncelleme hatası:', error);
            alert('Güncelleme sırasında bir hata oluştu: ' + (error.response?.data?.message || 'Bilinmeyen hata'));
        }

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-11/12 md:w-2/3 lg:w-1/3 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Ürün Düzenle</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-xs font-medium mb-1">Ürün Adı *</label>
                        <input
                            type="text"
                            name="name"
                            value={updatedProduct.name || ''}
                            onChange={handleChange}
                            className="w-full p-1 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-xs font-medium mb-1">Marka *</label>
                        <input
                            type="text"
                            name="brand"
                            value={updatedProduct.brand || ''}
                            onChange={handleChange}
                            className="w-full p-1 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-xs font-medium mb-1">Açıklama *</label>
                        <textarea
                            name="description"
                            value={updatedProduct.description || ''}
                            onChange={handleChange}
                            className="w-full p-1 border rounded"
                            required
                        />
                    </div>

                    <div className='flex justify-center items-start gap-6'>
                        <div className="mb-4 w-full">
                            <label className="block text-xs font-medium mb-1">Fiyat (TL) *</label>
                            <input
                                type="number"
                                name="price"
                                value={updatedProduct.price || ''}
                                onChange={handleChange}
                                className="w-full p-1 border rounded"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="mb-4 w-full">
                            <label className="block text-xs font-medium mb-1">Stok *</label>
                            <input
                                type="number"
                                name="stock"
                                value={updatedProduct.stock || ''}
                                onChange={handleChange}
                                className="w-full p-1 border rounded"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    <div className='flex justify-center items-start gap-6'>
                        <div className="mb-4 w-full">
                            <label className="block text-xs font-medium mb-1">Kategori *</label>
                            <select
                                name="category"
                                value={updatedProduct.category || ''}
                                onChange={handleChange}
                                className="w-full p-1 border rounded"
                                required
                            >
                                <option value="">Seçiniz</option>
                                <option value="T-Shirt">T-Shirt</option>
                                <option value="Sweatshirt">Sweatshirt</option>
                                <option value="Gömlek">Gömlek</option>
                                <option value="Ceket">Ceket</option>
                                <option value="Pantolon">Pantolon</option>
                                <option value="Eşofman">Eşofman</option>
                                <option value="Mont">Mont</option>
                                <option value="Yağmurluk">Yağmurluk</option>
                                <option value="Yelek">Yelek</option>
                                <option value="Şapka">Şapka</option>
                                <option value="Şort">Şort</option>
                                <option value="AyakkabıveTerlik">Ayakkabı ve Terlik</option>
                                <option value="Aksesuar">Aksesuar</option>
                            </select>
                        </div>
                        <div className="mb-4 w-full">
                            <label className="block text-xs font-medium mb-1">Beden *</label>
                            <select
                                name="size"
                                value={updatedProduct.size || []}
                                onChange={handleSizeChange}
                                className="w-full p-1 border rounded"
                                multiple
                                required
                            >
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-xs font-medium mb-1">Etiket *</label>
                        <select
                            name="tags"
                            value={updatedProduct.tags || []}
                            onChange={handleTagChange}
                            className="w-full p-1 border rounded"
                            required
                        >
                            <option value="">Seçiniz</option>
                            <option value="Yeni">Yeni</option>
                            <option value="Tercih Edilen">Tercih Edilen</option>
                            <option value="İndirimli">İndirimli</option>
                            <option value="Sinirli Stok">Sınırlı Stok</option>
                            <option value="Kampanya">Kampanya</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-xs font-medium mb-1">Renk *</label>
                        <input
                            type="text"
                            name="color"
                            value={updatedProduct.color || ''}
                            onChange={handleChange}
                            className="w-full p-1 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4 flex flex-col gap-1 items-start justift-start">
                        <label className="block text-xs  items-start font-medium mb-1">Satışta mı ?</label>
                        <input
                            type="checkbox"
                            name="selling"
                            value={updatedProduct.selling || ''}
                            onChange={handleChange}
                            className=" p-1 border rounded"
                        />
                    </div>



                    <div className="mt-2 mb-4">
                        <p className="text-xs text-gray-600 mb-2">Mevcut Görseller:</p>
                        <div className="flex flex-wrap gap-2">
                            {Array.isArray(product.imageUrls) ? (
                                product.imageUrls.map((imageUrl, index) => (
                                    <div key={`existing-${index}`} className="relative">
                                        <img
                                            src={`http://localhost:8000${imageUrl}`}
                                            alt={`Görsel ${index + 1}`}
                                            className="w-12 h-12 object-cover rounded"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/placeholder.jpg';
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExistingImage(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-500">Henüz görsel eklenmemiş</p>
                            )}
                        </div>

                        {/* Yeni resim yükleme */}
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full my-4 p-1 border rounded"
                            accept="image/*"
                            multiple
                        />

                        {/* Yeni yüklenen resimlerin önizlemesi */}
                        <div className="mt-2 flex flex-wrap gap-2">
                            {imagePreviews.map((preview, index) => (
                                <div key={`preview-${index}`} className="relative">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveNewImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button
                            type="submit"
                            className="bg-emerald-500 hover:bg-emerald-600 duration-300 ease-in-out transition-all text-xs text-white px-4 py-2 rounded"
                        >
                            Güncelle
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 bg-red-500 hover:bg-red-600 duration-300 text-white text-xs ease-in-out transition-all px-4 py-2 rounded"
                        >
                            İptal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UrunUpdateModal;
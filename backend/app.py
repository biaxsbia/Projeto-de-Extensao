from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)


CORS(app, origins=["http://localhost:3000"], methods=["GET", "POST", "PUT", "DELETE"], supports_credentials=True)

client = MongoClient('mongodb://mongo:27017/')
db = client.ongdb

@app.route('/promotions', methods=['GET'])
def get_promotions():
    promotions = list(db.promotions.find({}))
    for promotion in promotions:
        promotion['_id'] = str(promotion['_id'])
    return jsonify(promotions), 200

@app.route('/promotions', methods=['POST'])
def add_promotion():
    new_promotion = request.get_json()
    db.promotions.insert_one(new_promotion)
    return jsonify({"message": "Promoção cadastrada com sucesso"}), 201

@app.route('/promotions/<promotion_id>', methods=['GET'])
def get_promotion_details(promotion_id):
    promotion = db.promotions.find_one({"_id": ObjectId(promotion_id)})
    if promotion:
        promotion['_id'] = str(promotion['_id'])
        return jsonify(promotion), 200
    return jsonify({"error": "Promoção não encontrada"}), 404

@app.route('/promotions/<promotion_id>', methods=['DELETE'])
def delete_promotion(promotion_id):
    result = db.promotions.delete_one({"_id": ObjectId(promotion_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Promoção deletada com sucesso"}), 200
    return jsonify({"error": "Promoção não encontrada"}), 404

@app.route('/promotions/<promotion_id>', methods=['PUT'])
def update_promotion(promotion_id):
    updated_data = request.get_json()
    result = db.promotions.update_one({"_id": ObjectId(promotion_id)}, {"$set": updated_data})
    if result.modified_count > 0:
        return jsonify({"message": "Promoção atualizada com sucesso"}), 200
    return jsonify({"error": "Promoção não encontrada"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

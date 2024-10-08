from flask import Flask, jsonify, request, make_response
import csv
import pandas as pd

app = Flask(__name__)

LOG = True

TeamList = ['Arsenal', 'Aston-Villa', 'Bournemouth', 'Brentford', 'Brighton', 'Chelsea' 
            ,'Crystal-Palace', 'Everton', 'Fulham', 'Liverpool', 'Manchester-City', 'Manchester-United'
            , 'Newcastle-United', 'Nottingham-Forest', 'Tottenham', 'West-Ham-United', 'Wolverhampton-Wanderers']

@app.route('/teamStatBySeason', methods=['GET'])
def getTeamStatBySeason():
    season = request.args.get('season')
    team = request.args.get('team')
    fileName = team + '_' + season + '.csv'
    data = pd.read_csv(fileName, header=0)
    data = data.fillna(value=0)

    json_data = data.to_dict(orient='records')
    response = make_response(jsonify(json_data))
    
    #CORS 해결 위한 헤더 추가
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

    print(response)

    return response


@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "Hello from Flask!"}
    
    if LOG==True:
        print(jsonify(data))
    return jsonify(data)

@app.route('/test/readCsvFile/api', methods=['GET'])
def testReadCsvFileApi():
    season = request.args.get('season')
    fileName = TeamList[0]+'_' + season+ '.csv'
    data = pd.read_csv(fileName, header=0)
    json_data = data.to_dict(orient='records')
    return jsonify(json_data)
    

if __name__ == '__main__':
    app.run(debug=True, port=8080, host='0.0.0.0')
